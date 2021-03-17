import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useHistory } from 'react-router';
import { useStyles } from '../styles/board.style';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import { message } from 'antd';
import { GET_CATEGORIES } from '../../../configs/queries';

export default function SelectCategory({ boardId, value, setValue, isWrite }) {
    const classes = useStyles();
    const history = useHistory();
    const [categories, setCategories] = useState([]);
    const { data: categoriesData, error: categoriesError } = useQuery(GET_CATEGORIES, {
        variables: {
            boardId,
        },
    });
    useEffect(() => {
        if (categoriesData) {
            const data = categoriesData.getCategoriesByBoardId;
            setCategories(data);
            isWrite && setValue(data[0].categoryId);
        }
        if (categoriesError) {
            message.error('카테고리를 불러오는 중 오류가 발생했습니다.');
            history.push('/');
        }
    }, [categoriesData, categoriesError, setCategories, isWrite, setValue, history]);

    const handleChange = useCallback(
        (e) => {
            const { value } = e.target;
            setValue(value);
        },
        [setValue],
    );
    return (
        <>
            {categories.length > 0 && (
                <FormControl size="small" variant="outlined" className={classes.formControl}>
                    <InputLabel>카테고리</InputLabel>
                    <Select value={value} onChange={handleChange}>
                        {!isWrite && <MenuItem value="">전체</MenuItem>}
                        {categories.map((c, idx) => (
                            <MenuItem value={c.categoryId} key={idx}>
                                {c.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
}
