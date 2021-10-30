import React, { useState, useEffect } from "react";
//include images into your bundle
//create your first component
const Home = () => {
	//Aquí abajo creo mi variable de estado que se llama nombre y una función que cambiará el valor de nombre
	//y esa función se llama cambiar nombre cuyo valor inicial es un texto vacío
	const [Nombre, cambiarNombre] = useState("Renato");
	const [Lista, agregaraLista] = useState([]);
	const [Tarea, guardarTarea] = useState("");
	const [Homework, setHomework] = useState([]);

	function ObtenerDatos() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/renato1",
			requestOptions
		)
			.then(response => response.json())
			.then(result => {
				console.log(result);
				setHomework(result);
			})
			.catch(error => console.log("error", error));
	}

	function PutApp() {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var raw = JSON.stringify(Homework);

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/renato1",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	}

	function eliminar(id) {
		let homework_aux = Homework;
		homework_aux.splice(id, 1);
		setHomework(homework_aux);
		PutApp();
	}
	useEffect(() => {
		ObtenerDatos();
	}, []);

	useEffect(() => {
		PutApp ();
	}, []);

	return (
		<div className="text-center mt-5">
			{" "}
			<h1>To do {Nombre}</h1>{" "}
			<input
				type="text"
				onChange={evento => {
					guardarTarea(evento.target.value);
				}}
				placeholder="Texto"
			/>
			<button
				onClick={() => {
					setHomework([...Homework, { label: Tarea, done: false }]);
					PutApp();
				}}
				type="button">
				Click Me!
			</button>
			{Homework.map((element, id) => {
				return (
					<div key={id}>
						{element.label}{" "}
						<button onClick={() => eliminar(id)}>Eliminar</button>{" "}
					</div>
				);
			})}
		</div>
	);
};
export default Home;
