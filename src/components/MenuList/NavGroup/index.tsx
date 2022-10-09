import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

// project imports
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';
import styles from '../indexStyles';

const NavGroup = ({ item }: any) => {
  // menu list collapse & items
  const items = item.children?.map((menu: any) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={styles.menuCaption}
              display="block"
              gutterBottom
            >
              {item.title}
              {item.caption && (
                <Typography
                  variant="caption"
                   sx={styles.subMenuCaption}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        {items}
      </List>

      {/* group divider */}
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  );
};

export default NavGroup;
