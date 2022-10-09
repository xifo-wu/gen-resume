export interface MenuItem {
  id: string;
  title: string;
  type: 'group' | 'item';
  caption: string;
  children: MenuItem[];
}
