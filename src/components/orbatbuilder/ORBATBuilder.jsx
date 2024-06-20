import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import ReactFlow, {
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	Background,
	useNodesState,
	useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { fetchHelper } from "../funcs/common/fetchHelper";
import {
	Box,
	Paper,
	Typography,
	Menu,
	MenuItem,
	Button,
	Container,
} from "@mui/material";
import { apiRequest } from "../funcs/common";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const initialNodes = [];
const initialEdges = [];

const ORBATBuilder = () => {
	const { auth } = useAuth();
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const [squads, setSquads] = useState([]);
	const [contextMenu, setContextMenu] = useState(null);
	const [selectedElement, setSelectedElement] = useState(null);

	const fetchSquads = useCallback(async () => {
		try {
			const squadsData = await fetchHelper(auth.token, "squads");
			setSquads(squadsData);
		} catch (error) {
			console.error(error);
		}
	}, [auth.token]);

	const loadFlow = useCallback(async () => {
		try {
			const response = await apiRequest(
				"flow/load",
				"GET",
				null,
				auth.token || null,
			);
			const flow = response.flow;
			setNodes(JSON.parse(flow.nodes));
			setEdges(JSON.parse(flow.edges));
		} catch (error) {
			console.error(error);
			alert("Failed to load flow");
		}
	}, [auth.token, setEdges, setNodes]);

	useEffect(() => {
		fetchSquads();
		loadFlow();
	}, [fetchSquads, loadFlow]);

	const onConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges],
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const reactFlowBounds = event.target.getBoundingClientRect();
			const type = event.dataTransfer.getData("application/reactflow");
			const position = {
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			};
			const newNode = {
				id: String(nodes.length + 1),
				type,
				position,
				data: { label: type },
			};

			setNodes((nds) => nds.concat(newNode));
		},
		[nodes, setNodes],
	);

	const handleNodeContextMenu = useCallback((event, node) => {
		event.preventDefault();
		setSelectedElement(node);
		setContextMenu({
			mouseX: event.clientX - 2,
			mouseY: event.clientY - 4,
		});
	}, []);

	const handleEdgeContextMenu = useCallback((event, edge) => {
		event.preventDefault();
		setSelectedElement(edge);
		setContextMenu({
			mouseX: event.clientX - 2,
			mouseY: event.clientY - 4,
		});
	}, []);

	const handleContextMenuClose = () => {
		setContextMenu(null);
	};

	const handleDeleteElement = () => {
		if (selectedElement) {
			if (selectedElement.source) {
				setEdges((eds) =>
					applyEdgeChanges([{ id: selectedElement.id, type: "remove" }], eds),
				);
			} else {
				setNodes((nds) =>
					applyNodeChanges([{ id: selectedElement.id, type: "remove" }], nds),
				);
				setEdges((eds) =>
					eds.filter(
						(edge) =>
							edge.source !== selectedElement.id &&
							edge.target !== selectedElement.id,
					),
				);
			}
		}
		handleContextMenuClose();
	};

	const saveFlow = async () => {
		const flow = {
			nodes,
			edges,
		};
		try {
			await apiRequest("flow/save", "POST", flow, auth.token || null);
			alert("Flow saved!");
		} catch (error) {
			console.error(error);
			alert("Failed to save flow");
		}
	};

	const exportToPdf = async () => {
		const reactFlowNode = document.querySelector(".react-flow");
		if (!reactFlowNode) return;

		const canvas = await html2canvas(reactFlowNode);
		const imgData = canvas.toDataURL("image/png");

		const pdfWidth = 297;
		const pdfHeight = 210;
		const imgWidth = canvas.width;
		const imgHeight = canvas.height;

		const scale = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

		const pdf = new jsPDF({
			orientation: "landscape",
			unit: "mm",
			format: "a4",
		});
		pdf.addImage(
			imgData,
			"PNG",
			(pdfWidth - imgWidth * scale) / 2,
			(pdfHeight - imgHeight * scale) / 2,
			imgWidth * scale,
			imgHeight * scale,
		);
		pdf.save("ORBAT.pdf");
	};

	return (
		<Box display="flex">
			<Paper
				elevation={3}
				sx={{
					width: "20%",
					padding: "16px",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography variant="h6" gutterBottom>
					Drag a squad onto the chart
				</Typography>
				{Array.isArray(squads) && squads.length > 0 ? (
					squads.map((squad) => (
						<Paper
							key={squad.id}
							variant="outlined"
							style={{ padding: "8px", marginBottom: "8px" }}
							onDragStart={(event) =>
								event.dataTransfer.setData("application/reactflow", squad.name)
							}
							draggable
						>
							{squad.name}
						</Paper>
					))
				) : (
					<Typography>No squads available</Typography>
				)}
				<Container
					sx={{
						marginTop: "auto",
						display: "flex",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					<Button
						variant="contained"
						color="primary"
						onClick={saveFlow}
						sx={{ width: 100 }}
					>
						Save Flow
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={exportToPdf}
						sx={{ marginLeft: 5, width: 100 }}
					>
						Export to PDF
					</Button>
				</Container>
			</Paper>

			<Box
				style={{ flexGrow: 1, width: "80vw", height: "91vh" }}
				onDrop={onDrop}
				onDragOver={onDragOver}
			>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onNodeContextMenu={handleNodeContextMenu}
					onEdgeContextMenu={handleEdgeContextMenu}
					className="react-flow"
				>
					<Background />
				</ReactFlow>
			</Box>
			<Menu
				keepMounted
				open={contextMenu !== null}
				onClose={handleContextMenuClose}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? { top: contextMenu.mouseY, left: contextMenu.mouseX }
						: undefined
				}
			>
				<MenuItem onClick={handleDeleteElement}>Delete</MenuItem>
			</Menu>
		</Box>
	);
};

export default ORBATBuilder;
