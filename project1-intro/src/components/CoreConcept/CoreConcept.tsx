
export interface ICoreConcept {
    title: string,
    description: string,
    image: string
}


export function CoreConcept(props : ICoreConcept) {
    return (
        <li>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    );
}