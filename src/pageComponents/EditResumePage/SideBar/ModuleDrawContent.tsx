import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

interface ModuleDrawContentProps {
  onAddModule: (id: string) => void;
}

const ModuleDrawContent = (props: ModuleDrawContentProps) => {
  const { onAddModule } = props
  const modules = [
    {
      id: 'workExperience',
      name: '工作经历',
      en: 'Work Experience',
    },
    {
      id: 'education',
      name: '教育经历',
      en: 'Education',
    },
    {
      id: 'projects',
      name: '项目经历',
      en: 'Projects',
    },
  ];

  const handleAddModule = (id: string) => {
    // 发送添加模块请求
    onAddModule(id)
  }

  // TODO 已经添加了的不能再次添加并把添加按钮灰掉
  return (
    <Box sx={{ p: 2 }}>
      <Grid spacing={2} container>
        {modules.map((item) => (
          <Grid key={item.id} xs={6} item>
            <Box
              sx={{
                p: 2,
                color: 'rgba(0, 0, 0, 0.87)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minWidth: '0px',
                overflowWrap: 'break-word',
                backgroundColor: 'rgb(255, 255, 255)',
                backgroundClip: 'border-box',
                border: '0px solid rgba(0, 0, 0, 0.125)',
                borderRadius: '1rem',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
              }}
            >
              <Grid container>
                <Grid item xs={8}>
                  <Box>
                    <Typography
                      sx={{
                        margin: '0px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        letterSpacing: '0.02857em',
                        opacity: '1',
                        textTransform: 'capitalize',
                        verticalAlign: 'unset',
                        textDecoration: 'none',
                        color: 'rgb(103, 116, 142)',
                        fontWeight: '700',
                      }}
                    >
                      {item.en}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '0px',
                        fontSize: '1.25rem',
                        lineHeight: '1.375',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        letterSpacing: '0em',
                        opacity: '1',
                        textTransform: 'none',
                        verticalAlign: 'unset',
                        textDecoration: 'none',
                        color: 'rgb(52, 71, 103)',
                        fontWeight: '700',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    onClick={() => handleAddModule(item.id)}
                    sx={{
                      cursor: 'pointer',
                      width: '3rem',
                      height: '3rem',
                      marginLeft: 'auto',
                      display: 'flex',
                      WebkitBoxPack: 'center',
                      justifyContent: 'center',
                      WebkitBoxAlign: 'center',
                      alignItems: 'center',
                      opacity: '1',
                      background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                      color: 'rgb(255, 255, 255)',
                      borderRadius: '0.5rem',
                      boxShadow:
                        'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
                    }}
                  >
                    <Add
                      sx={{
                        userSelect: 'none',
                        width: '1em',
                        height: '1em',
                        overflow: 'hidden',
                        display: 'inline-block',
                        textAlign: 'center',
                        flexShrink: '0',
                        fontSize: '1.25rem !important',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ModuleDrawContent;
