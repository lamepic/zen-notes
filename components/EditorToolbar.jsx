import { AlignJustify, AlignLeft, AlignRight, Bold, Code, Italic, Underline } from 'lucide-react';
import React from 'react';

const tools = [
  {
    type: 'BOLD',
    icon: <Bold size={20} />,
  },
  {
    type: 'UNDERLINE',
    icon: <Underline size={20} />,
  },
  {
    type: 'ITALIC',
    icon: <Italic size={20} />,
  },
  //   {
  //     type: "CODE",
  //     icon: <Code size={20} />,
  //   },
  //   {
  //     type: "LEFT",
  //     icon: <AlignLeft size={20} />,
  //   },
  //   {
  //     type: "RIGHT",
  //     icon: <AlignRight size={20} />,
  //   },
];

function EditorToolbar({ onEditorChange }) {
  const handleClick = (type) => {
    onEditorChange(type);
  };
  return (
    <div className="flex items-center justify-center space-x-3 border p-2 bg-gray-400/10 h-5">
      {/* {tools.map((item) => (
        <ToolbarIcon onClick={() => handleClick(item.type)} key={item.type}>
          {item.icon}
        </ToolbarIcon>
      ))} */}
    </div>
  );
}

export default EditorToolbar;

const ToolbarIcon = ({ children, ...props }) => <button {...props}>{children}</button>;
