import { useEffect, MouseEvent, useState } from "react";
import { io } from "socket.io-client";
import { Button, TextField, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FileShare } from "./FileShare";
import { makeStyles } from "@material-ui/core";

const StyledButton = styled(Button)`
	height: 100%;
	width: 100%;
`;
//const socket = io('http://localhost:4000');
const socket = io("https://limitless-tundra-34178.herokuapp.com/");

const useStyles = makeStyles((theme) => {
	return {
		app: {
			minWidth: "400px",
			minHeight: "200px",
			left: "50%",
			width: "100%",
			height: "100%",
		},
	};
});

export const JoinRoom = () => {
	const [value, setValue] = useState("");
	const [roomReady, setRoomReady] = useState(false);
	useEffect(() => {
		socket.on("connect", () => {
			console.log("Hello from Join Room");
		});
		socket.on("in-room", () => {
			setRoomReady(true);
			console.log("In room");
		});
		socket.on("connect_error", (err) => {
			console.log(`connect_error due to ${err.message}`);
		});
		socket.on("both-in-room", () => {
			console.log("We should get same message");
		});
	}, []);

	const handleClick = (event: MouseEvent): void => {
		console.log(value);
		socket.emit("join-room", {
			roomId: value,
			socketId: socket.id,
		});
	};
	const classes = useStyles();

	return (
		<>
			{roomReady ? (
				<FileShare socket={socket} roomId={value} />
			) : (
				<Grid className={classes.app} container spacing={2}>
					<Grid item xs={4}>
						<div> Share your files securely</div>
						<TextField
							fullWidth
							label="Enter Room ID"
							variant="outlined"
							value={value}
							onChange={(e) => setValue(e.target.value)}
						/>
					</Grid>
					<Grid item xs={2}>
						<StyledButton onClick={handleClick}>Join Room</StyledButton>
					</Grid>
				</Grid>

				// <Stack
				// spacing={6}
				// direction="row"
				// alignItems="center"
				// justifyContent="center"
				// style={{ minHeight: "75vh" }}>
				//     div

				// </Stack>
			)}
		</>
	);
};
