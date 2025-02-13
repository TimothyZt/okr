import React, { useState } from 'react';
import Tree from 'react-d3-tree';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.
const orgChart = {
      name: '',
   

      children: [
        {
          name: '',
          attributes: {
          
          },
     
        },
        {
          name: '',
          attributes: {
            
          },
      
        },
      ],

};

export default function OrgChartTree() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };
  const CustomNodeElement = () => {
    return (
    <>
     
    </>

    );
  };
  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id='' style={{ width: '15em', height: '10em' }}>
      <Tree data={orgChart} 
      translate={{x:5,y:93}}
      nodeSize={{x:100,y:100}} 
      depthFactor={100} 
      scaleExtent={{min:0.6,max:1.5} } 
      zoomable={true} 
      shouldCollapseNeighborNodes={true} 
      onNodeClick={handleButtonClick} 
      renderCustomNodeElement={CustomNodeElement}/>
    </div>
  );
}