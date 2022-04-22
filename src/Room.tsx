import { useEffect, useState, MouseEvent } from "react";
import { io, Socket } from "socket.io-client";
import { Grid } from "@mui/material";
import { MetaData } from "../types";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { DownloadFileCard } from "./DownloadFileCard";
import { Stack } from "@mui/material";

type RoomProps = {
	connected: boolean;
	roomId: string;
	socket: Socket;
};
export interface incomingFiles extends MetaData {
	fileUrl: string;
}
// Change Component Names
export const Room = ({ connected, roomId, socket }: RoomProps) => {
	const [files, setFiles] = useState<incomingFiles[]>([]);
	useEffect(() => {
		socket.on("file-received", (data: ArrayBuffer, metaData: MetaData) => {
			const buffer = [data];
			// let link = document.createElement('a');
			// link.download = metaData.fileName;
			const blob = new Blob(buffer, { type: metaData.fileType });
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onload = () => {
				const readerRes = reader.result as string;
				// link.href = readerRes
				const file: incomingFiles = {
					fileName: metaData.fileName,
					fileType: metaData.fileType,
					fileSize: metaData.fileSize,
					fileUrl: readerRes,
				};
				setFiles((list) => [...list, file]);
				console.log(file);
				// link.click()
			};
			// If filetype pdf display a pdf lgo
			// If filetype is jpeg, png, jpg display the img itself
			// each of these things should have download button next to them
			// Idea to make it look like button do what the guy did above with creating anchor tag and doing link.click when button is clicked
		});
	}, []);

	return (
		<>
			{connected ? (
				<Grid container spacing={2} justifyContent="center">
					{files.map((file) => {
						return (
							<Grid item>
								<DownloadFileCard
									fileName={file.fileName}
									fileType={file.fileType}
									fileUrl={file.fileUrl}
									fileSize={file.fileSize}
								/>
								{/* <div>{file.fileName}</div>
                <a href={file.fileUrl} download={file.fileName}>Download</a>
                <Button endIcon={<FileDownloadRoundedIcon />} onClick={handleClick}>Download</Button> */}
							</Grid>
						);
					})}
				</Grid>
			) : (
				<Stack
					spacing={6}
					direction="row"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "75vh" }}
				>
					<div> Share this room id: {roomId}</div>
					<button
						onClick={() => {
							navigator.clipboard.writeText(roomId);
						}}
					>
						Copy
					</button>
				</Stack>
			)}
		</>
	);
};
