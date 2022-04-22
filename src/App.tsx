import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
	Router,
	Link,
	goBack,
	goTo,
	popToTop,
} from "react-chrome-extension-router";
import { makeStyles } from "@material-ui/core";
import { Stack } from "@mui/material";
import { Button, TextField, Grid } from "@mui/material";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";
const useStyles = makeStyles((theme) => {
	return {
		buttonSize: {
			width: 400,
			height: 50,

			[theme.breakpoints.down("sm")]: {
				width: 200,
				height: 40,
			},
		},
		title: {
			color: "black",
			textAlign: "center",
			fontSize: "1.5rem",
		},
		center: {
			padding: "48px",
		},
	};
});

function App() {
	const Three = () => <JoinRoom />;

	const Two = () => <CreateRoom />;

	const Home = () => (
		<>
			<Stack
				spacing={6}
				direction="row"
				//alignItems="center"
				justifyContent="center"
				//style={{ minHeight: "75vh" }}
			>
				<Button
					onClick={() => goTo(Two)}
					variant="outlined"
					className={classes.buttonSize}
				>
					Create Room
				</Button>
				<Button
					onClick={() => goTo(Three)}
					variant="contained"
					className={classes.buttonSize}
				>
					Join Room
				</Button>
			</Stack>
		</>
	);

	const classes = useStyles();

	return (
		<Router>
			<Home />
		</Router>
	);
}

export default App;
