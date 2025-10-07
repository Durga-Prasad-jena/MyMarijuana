import { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { useSpring, animated } from 'react-spring';
import { Collapse } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { IconFolderPlus, IconFolderMinus, IconFolder } from '@tabler/icons-react';
import Breadcrumb from '../../../src/layouts/theme/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../src/theme-components/container/PageContainer';
import ParentCard from '../../../src/theme-components/shared/ParentCard';
import ChildCard from '../../../src/theme-components/shared/ChildCard';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Treeview',
  },
];

function MinusSquare(props: SvgIconProps) {
  return (
    <>
      <IconFolderMinus style={{ width: 22, height: 22 }} {...props} />
    </>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <>
      <IconFolderPlus style={{ width: 22, height: 22 }} {...props} />
    </>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <>
      <IconFolder style={{ width: 22, height: 22 }} {...props} />
    </>
  );
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  '& .MuiTreeItem-iconContainer': {
    '& .close': {
      opacity: 0.3,
    },
  },
  '& .MuiTreeItem-group': {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const Treeview = () => {
  return (
    <PageContainer>
      {/* breadcrumb */}
      <Breadcrumb title="Treeview" items={BCrumb} />
      {/* end breadcrumb */}
      <ParentCard title="Treeview">
        <ChildCard>
          <SimpleTreeView
            aria-label="customized"
            defaultExpandedItems={['1']}
            slots={{
              collapseIcon: MinusSquare,
              expandIcon: PlusSquare,
              endIcon: CloseSquare,
            }}
            sx={{ height: 200, flexGrow: 1, overflowY: 'auto' }}
          >
            <StyledTreeItem itemId="1" label="Main">
              <StyledTreeItem itemId="2" label="Hello" />
              <StyledTreeItem itemId="3" label="Subtree with children">
                <StyledTreeItem itemId="6" label="Hello" />
                <StyledTreeItem itemId="7" label="Sub-subtree with children">
                  <StyledTreeItem itemId="9" label="Child 1" />
                  <StyledTreeItem itemId="10" label="Child 2" />
                  <StyledTreeItem itemId="11" label="Child 3" />
                </StyledTreeItem>
                <StyledTreeItem itemId="8" label="Hello" />
              </StyledTreeItem>
              <StyledTreeItem itemId="4" label="World" />
              <StyledTreeItem itemId="5" label="Something something" />
            </StyledTreeItem>
          </SimpleTreeView>
        </ChildCard>
      </ParentCard>
    </PageContainer>
  );
};

export default Treeview;
