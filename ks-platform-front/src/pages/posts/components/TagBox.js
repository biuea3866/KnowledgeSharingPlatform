import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { addTag, changeField } from '../../../modules/post';
import BottomlineInput from '../../components/common/BottomlineInput';
import FullButton from '../../components/common/FullButton';

const Box = styled.div`
    width: 90%;
`;

const TagForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TagInput = styled(BottomlineInput)`
    float: left;
    width: 200px;
    height: 40px;
`;

const TagButton = styled(FullButton)`
    float: left;
    width: 70px;
    height: 40px;
    margin-left: 10px;
`;

const TagTable = styled.div`
    width: 100%;
    flex-wrap: wrap;
    display: flex;
`;

const Tag = styled.div`
    float: left;
    width: 80px;
    height: 40px;
    background-color: ${ palette.gray[3] };
    margin: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${ palette.gray[6] };
`;

const TagBox = () => {
    const { 
        post, 
        form,
        user
    } = useSelector(({ 
        post,
        user 
    }) => ({ 
        post: post.post,
        form: post.tags,
        user: user.user
    }));
    const dispatch = useDispatch();
    const onChangeTag = e => {
        const {
            name,
            value
        } = e.target;
        
        dispatch(changeField({
            form: 'tags',
            key: name,
            value
        }));
    }; 
    const onTag = e => {
        e.preventDefault();

        const { tag } = form;
        const { post_id } = post;

        dispatch(addTag({
            tag,
            post_id
        }));
    };

    return(
        <Box>
            <TagTable>
                {
                    post.tags.map(item => <Tag>
                                              { item.tag }
                                          </Tag>)
                }
            </TagTable>
            {
                user.user_id === post.user_id &&
                <TagForm onSubmit={ onTag }>
                    <TagInput placeholder="Enter tag!"
                            name="tag"
                            onChange={ onChangeTag }
                    />
                    <TagButton red>
                        추가
                    </TagButton>
                </TagForm>
            }
        </Box>
    );
};

export default TagBox;