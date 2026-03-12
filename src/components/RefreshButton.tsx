import { keyframes } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from 'react';
import { Tooltip } from '@mui/material';

const spinAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

interface RefreshButtonType {
 onClick:()=>void;
}

const RefreshButton:React.FC<Partial<RefreshButtonType>> = ({onClick}) => {
  const [spin, setSpin] = useState(false);

  return (
    <IconButton
      onClick={() => {
        setSpin(true);
        setTimeout(() => setSpin(false), 600);
        if(onClick){
            onClick()
        }
      }}
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: 'action.hover',
      }}
    >
      <Tooltip title="Reset">
        <RefreshIcon
        sx={{
          animation: spin ? `${spinAnim} 0.6s linear` : 'none',
        }}
      />
      </Tooltip>
    </IconButton>
  );
};

export default RefreshButton;
