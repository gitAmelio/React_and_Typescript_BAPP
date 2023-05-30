import { Child } from './Child';
import { ChildAsFC } from './Child';

function clicked():void {
    console.log('Clicked')
}

const children = <div>I am still a children</div>;


const Parent = () => {
    return <div>
        <Child color="red" onClick={ clicked } >
            {children}
        </Child>

        <ChildAsFC color="red" onClick={ clicked }>
          {children}
        </ChildAsFC>
    </div>
}

export default Parent;