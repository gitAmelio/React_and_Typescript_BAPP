import { ReactNode } from "react";

interface ChildProps {
   color: string;
   onClick: () => void;
   children?: ReactNode;
}

// Typescript does can not identify the following as a React Component
export const Child = ({color, onClick, children}: ChildProps) => {
   return <div>
            {color}
            {children}
            <button onClick={onClick}>Click me</button>
         </div>
}

// But this, it can     React.FunctionComponent
// React.FC no longer includes the children property in it's type
export const ChildAsFC: React.FC<ChildProps> = ({color, onClick, children}) => {
   return <div>
            {color}
            {children}
            <button onClick={onClick}>Click me</button>
          </div>
}