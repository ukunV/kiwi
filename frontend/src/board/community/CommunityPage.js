import React from 'react';
import Root from '../../header/Root';

import PageTitle from '../../common/components/PageTitle';
import BoardContent from '../common/components/BoardContent';

export default function CommunityPage() {
    return (
        <Root>
            <PageTitle title="커뮤니티" />
            <BoardContent />
        </Root>
    );
}