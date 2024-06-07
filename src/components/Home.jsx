import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
	Avatar,
	Box,
	Container,
	CssBaseline,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FormButton } from "./buttons/FormButton";

const Home = () => {
	const { auth, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/dashboard");
		}
	}, [auth, navigate]);

	if (auth.loading || auth.isAuthenticated) {
		return;
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const result = await login(email, password);
		if (!result.success) {
			return;
		}
		navigate("/dashboard");
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Paper
				sx={{
					marginTop: 10,
					padding: 5,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "primary.accent" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign In
					</Typography>
					<Box
						component="form"
						noValidate
						sx={{ mt: 1 }}
						onSubmit={handleSubmit}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormButton />
						<Grid container>
							<Grid item xs sx={{ display: "flex", justifyContent: "center" }}>
								<Link
									variant="body2"
									style={{ justifyContent: "center" }}
									color="text.primary"
								>
									Forgot password?
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Home;
