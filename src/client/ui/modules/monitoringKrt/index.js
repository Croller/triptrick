import React, { useState, useEffect } from 'react';
import { getKrtMonitoring, getTableByNames } from 'client/actions/krt';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  Wrapper,
  Tabs, Tab,
  Content,
  Table, Header, Body, Row, Cell,
  GroupText, NameText,
  GroupWrapper,
  GroupTitle,
  GroupContainer,
  Group,
  GroupCount,
  Before,
  Current,
  GroupName,
} from './styled';

const TABS_DATA = [
  { id: 'data_krt_confirm', name: 'Установленные' },
  { id: 'data_krt_unconfirm', name: 'Не установленные' },
  { id: 'analitics', name: 'Дашборд' },
  // { id: 'map', name: 'Карта' },
];

const COLUMNS_WIDTH = {
  district: '80px',
  krt: '220px',
  stage: '200px',
  status_stage: '200px',
  date_start: '100px',
  date_end: '100px',
  next_stage: '180px',
  date_next: '180px',
  descriptions: '400px',
};

const EXCLUDE_KEYS = ['id', 'group_name', 'change_at'];

export const MonitoringKrtModule = () => {
  const rootDispatch = useDispatch();
  const { data, supoortData } = useSelector((state) => state.krt);
  const [tab, setTab] = useState('data_krt_confirm');

  const selectDicData = (cell, row, dictionaries) => {
    if (!row[cell.key]) return '';

    if (dictionaries[cell.type]) {
      const result = dictionaries[cell.type].find(item => item.id === row[cell.key]);
      return result.name;
    }
    if (cell.type === 'date') {
      return moment(row[cell.key]).isValid() ? moment(row[cell.key]).format('DD.MM.YYYY') : '';
    }
    return row[cell.key];
  };

  useEffect(() => {
    if (!data) {
      rootDispatch(getTableByNames([
        'data_krt',
        'description_data_krt',
        'dictionary_district',

        'description_data_krt_confirm',
        'dictionary_stage_data_krt_confirm',
        'dictionary_status_stage_data_krt_confirm',
        'dictionary_group_name_data_krt_confirm',

        'description_data_krt_unconfirm',
        'dictionary_stage_data_krt_unconfirm',
        'dictionary_status_stage_data_krt_unconfirm',
        'dictionary_group_name_data_krt_unconfirm',
      ]));
      rootDispatch(getKrtMonitoring([
        'data_krt_confirm',
        'data_krt_unconfirm',
      ]));
    }
  }, []);

  return (
    <Wrapper>
      <Tabs vertical={false}>
        {TABS_DATA.map((item, t) => (
          <Tab
            active={item.id === tab}
            onClick={() => setTab(item.id)}
            key={`_teb_${t + 1}`}
          >
            {item.name}
          </Tab>
        ))}
      </Tabs>
      <Content>
        {['data_krt_confirm', 'data_krt_unconfirm'].includes(tab) && (
          <Table>
            <Header>
              <Row>
                <Cell width="50px">№</Cell>
                {supoortData[`description_${tab}`] && supoortData[`description_${tab}`].filter(item => !EXCLUDE_KEYS.some(key => key === item.key)).map((header, h) => (
                  <Cell key={`_header_${h + 1}`} width={COLUMNS_WIDTH[header.key]}>
                    {header.name}
                  </Cell>
                ))}
              </Row>
            </Header>
            <Body>
              {supoortData[`dictionary_group_name_${tab}`] && supoortData[`dictionary_group_name_${tab}`].map((group, g) => (
                <React.Fragment key={`_group_${g + 1}`}>
                  <Row key={`_group_name_${g + 1}`}>
                    <Cell width="100%">
                      <GroupText>{group.name}</GroupText>
                    </Cell>
                  </Row>
                  {data && data[tab].sort((a, b) => a.group_name - b.group_name).filter((row) => row.group_name === group.id).map((row, r) => (
                    <Row key={`_row_${r + 1}`}>
                      <Cell width="50px">
                        {r + 1}
                      </Cell>
                      {supoortData[`description_${tab}`] && supoortData[`description_${tab}`].filter(item => !EXCLUDE_KEYS.some(key => key === item.key)).map((cell, h) => (
                        <Cell key={`_cell_${h + 1}`} width={COLUMNS_WIDTH[cell.key]}>
                          {cell.key === 'krt' ? (
                            <>
                              <NameText>{selectDicData(cell, row, supoortData)}</NameText>
                            </>
                          ) : selectDicData(cell, row, supoortData)}
                        </Cell>
                      ))}
                    </Row>
                  ))}
                </React.Fragment>
              ))}
            </Body>
          </Table>
        )}
        {tab === 'analitics' && (
          <GroupWrapper>
            {TABS_DATA.slice(0, 2).map((item, i) => (
              <React.Fragment key={`_group_krt_${i + 1}`}>
                <GroupTitle>{item.name}</GroupTitle>
                <GroupContainer>
                  {supoortData[`dictionary_group_name_${item.id}`] && supoortData[`dictionary_group_name_${item.id}`].map((group, g) => (
                    <Group key={`_group_name_${g + 1}`}>
                      <GroupCount>
                        <Before>
                          0
                        </Before>
                        <Current>
                          {data[item.id].filter(f => f.group_name === group.id).length}
                        </Current>
                      </GroupCount>
                      <GroupName>
                        {group.name}
                      </GroupName>
                    </Group>
                  ))}
                </GroupContainer>
              </React.Fragment>
            ))}
          </GroupWrapper>
        )}
      </Content>
    </Wrapper>
  );
};

