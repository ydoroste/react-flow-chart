import* as React from 'react'
import {INode} from '../../'
// class Test extends React.Component {

//     public render() {
//         return (
//             <div>
//                 <p>sldkjfhsjkdfhskjdfhskjdfh</p>
//             </div>
//         );
//     }
// }

// export default Test;
interface test {
    Node: INode
}

export const Test=(props:test) => {
    return (
        <div>
            <p>{props.Node.id}</p>
        </div>
    )
}