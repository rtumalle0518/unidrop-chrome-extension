import { useEffect, useState, useCallback } from "react";
// import { FilePond, registerPlugin } from 'react-filepond'
// import 'filepond/dist/filepond.min.css'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import { FilePondFile } from 'filepond';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// import { DragDrop } from '@uppy/react'
// import Uppy from '@uppy/core'
// import '@uppy/core/dist/style.css'
// import '@uppy/drag-drop/dist/style.css'
// registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import { read } from "fs";
import { Socket } from "socket.io-client";
import { MetaData } from "../types";

type FileShareProps = {
	socket: Socket;
	roomId?: string;
};

export {};

export const FileShare = ({ socket, roomId }: FileShareProps) => {
	const [files, setFiles] = useState<File[]>([]);
	useEffect(() => {}, []);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(acceptedFiles);
		acceptedFiles.forEach(async (file: File) => {
			const data = await file.arrayBuffer();
			const metaData: MetaData = {
				fileName: file.name,
				fileType: file.type,
				fileSize: file.size,
				roomId: roomId,
			};
			console.log(data);
			socket.emit("file-ready", data, metaData);
		});
		console.log(acceptedFiles[0]);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	// useEffect(() => {
	//   files.forEach(file => console.log(file.fileType))
	// }, files)
	// function shareFile() {
	//   console.log('yo')
	//   props.socket.to(props.roomId).emit('file-recieved', files);
	// }
	function handleFiles(acceptedFiles: File[]) {
		acceptedFiles.forEach(async (file: File) => {
			const bufferPromise = await file.arrayBuffer();
			// promise.then((data) => {
			//   console.log(data)
			// }).catch((reason) => console.log(reason))
		});
	}
	return (
		<Box component="div" sx={{ p: 2, border: "1px dashed grey" }}>
			<div {...getRootProps()}>
				<input {...getInputProps()} />
				{isDragActive ? (
					<p style={{ textAlign: "center" }}>Drop the files here ...</p>
				) : (
					<p style={{ textAlign: "center" }}>
						Drag 'n' drop some files here, or click to select files
					</p>
				)}
			</div>
		</Box>
	);
};
