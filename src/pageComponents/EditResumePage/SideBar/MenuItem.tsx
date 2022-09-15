import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';

const MenuItem = ({
  selected,
  title,
  icon,
  onClick,
  keyName,
}: {
  selected?: boolean;
  keyName: string;
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
  onClick: (keyName: string) => void;
}) => {
  const Icon = icon;
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => onClick(keyName)}
        sx={{
          mx: 1,
          padding: '0.675rem 1rem 0.675rem 1rem',
        }}
      >
        <ListItemIcon sx={{ minWidth: 'unset' }}>
          <Icon
            sx={(theme) => ({
              color: selected ? '#fff' : '#333',
              p: 1,
              flexShrink: '0',
              background: selected ? theme.palette.primary.main : 'rgb(233, 236, 239)',
              minWidth: '2rem',
              minHeight: '2rem',
              borderRadius: '0.5rem',
              display: 'grid',
              placeItems: 'center',
              boxShadow:
                'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
              transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            })}
          />
        </ListItemIcon>
        <ListItemText
          primary={title}
          sx={{
            ml: 1,
            '& .MuiListItemText-primary': {
              // fontWeight: 500,
              letterSpacing: 1.25,
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
