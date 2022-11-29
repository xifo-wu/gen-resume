'use client';

import _ from 'lodash';
import { Reorder } from 'framer-motion';
import { TbMist, TbLayout2, TbLayoutBoard } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from 'react-use';

import api from '@/utils/api';
import useApi from '@/hooks/useApi';
import ModuleMenuItem from './ModuleMenuItem';
import type { ModuleMapKeys } from '@/components/Resumes/modules';

const menus = [
  {
    key: 'module',
    title: '模块',
    icon: TbLayout2,
  },
  {
    key: 'layout',
    title: '模板',
    icon: TbLayoutBoard,
  },
];

interface MenuProps {
  id: string;
}

const Menu = ({ id }: MenuProps) => {
  const { data = {}, mutate } = useApi(id ? `/api/v1/resumes/${id}` : null);
  const [reordered, setReordered] = useState(data.moduleOrder);
  const [debouncedReordered, setDebouncedReordered] = useState('');

  const reorderedGroupValue = useMemo(
    () =>
      _.chain(reordered)
        .split(',')
        .filter((i) => !!i)
        .value(),
    [reordered],
  );
  console.log(reorderedGroupValue, 'reorderedGroupValue');

  useEffect(() => {
    setReordered(data.moduleOrder);
  }, [data.moduleOrder]);

  useDebounce(
    () => {
      if (debouncedReordered) {
        // TODO fix any
        mutate(
          async (originData: any) => {
            try {
              const response = await api.put(`/api/v1/resumes/${id}`, {
                data: {
                  moduleOrder: reordered,
                },
              });

              console.log(response, 'response');
            } catch (error: any) {
              // TODO fix any
              toast.error(error.message);
              return originData;
            }

            return originData;
          },
          { revalidate: false },
        );
      }

      setDebouncedReordered(reordered);
    },
    1000,
    [reordered],
  );

  const handleReorder = useCallback((newItems: string[]) => setReordered(newItems.join(',')), []);
  const handleActionClick = () => {};

  return (
    <div className="relative pt-12 px-2 w-[176px] bg-white min-h-screen h-full">
      <div className="py-4">
        <div className="text-slate-500 text-sm mb-2">操作列表</div>
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.key}
              className="flex items-center py-[10px] px-[15px] mb-2 cursor-pointer text-slate-500 hover:text-slate-700 hover:bg-slate-200"
            >
              <Icon size={18} />
              <div className="leading-none text-[15px] ml-1 font-medium">{item.title}</div>
            </div>
          );
        })}
        <div className="text-slate-500 text-sm mb-2">模块列表</div>
        <div className="flex items-center py-[10px] px-[15px] mb-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 select-none">
          <TbMist size={18} />
          <div className="flex-1 leading-none text-[15px] ml-1 font-medium cursor-pointer">
            基础信息
          </div>
        </div>
        <Reorder.Group axis="y" onReorder={handleReorder} values={reorderedGroupValue}>
          {_.map(
            reorderedGroupValue.filter((i: string) => i !== 'resumeBasic'),
            (item: ModuleMapKeys) => (
              <ModuleMenuItem
                onEditClick={handleActionClick}
                disableReorder={item === 'resumeBasic'}
                key={item}
                item={item}
              />
            ),
          )}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default Menu;
