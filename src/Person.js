export const Person = (props) => {
    return (
      <div>
				<h1>{props.name}</h1>
				<h1>{props.age}</h1>
				<h1>{props.email}</h1>
			</div>
    );
}