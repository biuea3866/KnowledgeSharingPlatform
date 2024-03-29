import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const Block = styled.div`
    backgroud-color: white;
    width: 450px;
    height: 400px;
    margin: 20px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    overflow: hidden;
`;

const Title = styled.div`
    float: left;
    width: 400px;
    height: 40px;
    overflow: hidden;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: left;
    padding: 10px;
`;

const Article = styled.div`
    float: left;
    width: 400px;
    height: 40px;
    overflow: hidden;
    text-align: left;
    padding-left: 10px;
`;

const Contents = styled.div`
    float: left;
    width: 400px;
    overflow: hidden;
    text-align: left;
    padding: 10px;
`;

const PostCard = post => {
    const navigate = useNavigate();
    const toPost = e => {
        navigate(`/na-docs/post/${post.post.post_id}`);
    };

    return(
        <Block onClick={ toPost }>
            <Title>
                { post.post.title }
            </Title>
            <Article>
                { post.post.created_at.substring(0, 10) }
            </Article>
            <Contents dangerouslySetInnerHTML={{ __html: post.post.contents }}/>
        </Block>
    );
};

export default PostCard;