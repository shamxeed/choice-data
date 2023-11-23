import React from 'react';
import { Link } from '@chakra-ui/next-js';
import { Grid, GridItem, Text } from '@chakra-ui/react';
import { colors } from '@/constants/themes';

const styles = {
  width: '100%',
  height: '100px',
  display: 'flex',
  background: colors.white,
  borderRadius: 10,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
};

const Item = ({ desc, title, icon }) => {
  return (
    <>
      {icon}

      {!!desc && (
        <Text color={'red.600'} fontSize={'sm'} mt={1}>
          {desc}
        </Text>
      )}
      <Text mt={1} fontWeight={700} textAlign={'center'}>
        {title}
      </Text>
    </>
  );
};

export const MyGrid = ({ list = [], onClick }) => {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={2}>
      {list.map((i) => (
        <GridItem
          style={{
            ...styles,
            paddingLeft: '5px',
            paddingRight: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
          }}
        >
          {i.screen ? (
            <Link
              href={i.screen}
              key={i.id}
              style={{
                ...styles,
                textDecoration: 'none',
              }}
            >
              <Item {...i} />
            </Link>
          ) : (
            <div
              style={...styles}
              onClick={() => {
                if (onClick) {
                  onClick(i.title);
                }
              }}
            >
              <Item {...i} />
            </div>
          )}
        </GridItem>
      ))}
    </Grid>
  );
};

export default MyGrid;
