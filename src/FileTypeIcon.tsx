import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";

type FileTypeIconProps = {
	fileType: string;
};

export const FileTypeIcon = ({ fileType }: FileTypeIconProps) => {
	const arr = fileType.split("/");
	const f_type = arr[0];
	if (f_type === "application") {
		return <PictureAsPdfIcon sx={{ height: "30%", width: "30%" }} />;
	} else if (f_type === "image") {
		return <ImageIcon sx={{ height: "30%", width: "30%" }} />;
	} else if (f_type === "audio") {
		return <AudioFileIcon sx={{ height: "30%", width: "30%" }} />;
	} else if (f_type === "text") {
		if (arr[1] === "plain") {
			return <TextSnippetIcon sx={{ height: "30%", width: "30%" }} />;
		} else {
			return <MiscellaneousServicesIcon sx={{ height: "30%", width: "30%" }} />;
		}
	}

	return <MiscellaneousServicesIcon sx={{ height: "30%", width: "30%" }} />;
};
