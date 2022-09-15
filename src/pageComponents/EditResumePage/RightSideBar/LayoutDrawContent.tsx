import React from 'react';
import _ from 'lodash';
import Image from 'next/image';
import { Box, Grid } from '@mui/material';
import templateMap from '@/components/Resume/templateMap';

interface LayoutDrawContentProps {
  onSelect: (id: string) => void;
}

const LayoutDrawContent = (props: LayoutDrawContentProps) => {
  const { onSelect } = props;
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        {_.map(templateMap, (item, key) => {
          return (
            <Grid key={key} xs={6} item>
              <Image
                onClick={() => onSelect(item.id)}
                layout="responsive"
                objectFit="cover"
                width={210}
                height={297}
                src={item.preview}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LayoutDrawContent;
