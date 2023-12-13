
export interface ICoreConcept {
    title: string,
    description: string,
    img: string
}


export default function CoreConcept(props : ICoreConcept) {
    return (
        <li>
            <img src={props.img} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    );
}