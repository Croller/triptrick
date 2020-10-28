import React, { useState, useEffect } from 'react';
import { getKrtMonitoring, getTableByName } from 'client/actions/krt';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  Wrapper,
  Tabs, Tab,
  Content,
  Table, Header, Body, Row, Cell,
  GroupText, DistrictText, NameText,
} from './styled';

const TABS_DATA = [
  { id: 0, name: 'Установленные' },
  { id: 1, name: 'Не установленные' },
  { id: 2, name: 'Дашборд' },
  { id: 3, name: 'Карта' },
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

const EXCLUDE_KEYS = ['id', 'group_name', 'district'];

export const MonitoringKrtModule = () => {
  const rootDispatch = useDispatch();
  const { data, supoortData } = useSelector((state) => state.krt);
  const [tab, setTab] = useState(0);

  const selectDicData = (cell, row, dictionaries) => {
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
      rootDispatch(getTableByName([
        'data_krt',
        'dictionary_district',
        'dictionary_group_krt_confirm',
        'dictionary_stage_krt_confirm',
        'dictionary_status_stage_krt_confirm',
        'description_krt_confirm',
        'description_krt',
      ]));
      rootDispatch(getKrtMonitoring([
        'data_krt_confirm',
        // 'data_krt_unconfirm',
      ]));
    }
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (supoortData) {
      console.log(supoortData);
    }
  }, [data, supoortData]);

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
        {tab === 0 && (
          <Table>
            <Header>
              <Row>
                <Cell width="50px">№</Cell>
                {supoortData.description_krt_confirm && supoortData.description_krt_confirm.filter(item => !EXCLUDE_KEYS.some(key => key === item.key)).map((header, h) => (
                  <Cell key={`_header_${h + 1}`} width={COLUMNS_WIDTH[header.key]}>
                    {header.name}
                  </Cell>
                ))}
              </Row>
            </Header>
            <Body>
              {supoortData.dictionary_group_krt_confirm && supoortData.dictionary_group_krt_confirm.map((group, g) => (
                <React.Fragment key={`_group_${g + 1}`}>
                  <Row key={`_group_name_${g + 1}`}>
                    <Cell width="100%">
                      <GroupText>{group.name}</GroupText>
                    </Cell>
                  </Row>
                  {data && data.data_krt_confirm.sort((a, b) => a.group_name - b.group_name).filter((row) => row.group_name === group.id).map((row, r) => (
                    <Row key={`_row_${r + 1}`}>
                      <Cell width="50px">
                        {r + 1}
                      </Cell>
                      {supoortData.description_krt_confirm && supoortData.description_krt_confirm.filter(item => !EXCLUDE_KEYS.some(key => key === item.key)).map((cell, h) => (
                        <Cell key={`_cell_${h + 1}`} width={COLUMNS_WIDTH[cell.key]}>
                          {cell.key === 'krt' ? (
                            <>
                              <DistrictText>{selectDicData(supoortData.description_krt_confirm.find(f => f.key === 'district'), row, supoortData)}</DistrictText>
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
      </Content>
    </Wrapper>
  );
};

