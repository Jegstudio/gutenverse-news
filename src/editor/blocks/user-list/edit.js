import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { ModuleSkeleton } from '../../part/placeholder';
import HeaderModule from '../../part/header';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useRef } from '@wordpress/element';

const UserlistBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        icon,
        title,
        second_title,
        headerType,
        listStyle,
        showRole,
        hideRole,
        includeUser,
        excludeUser,
        numberUser,
        blockWidth,
        blockWidth2,
        blockWidth3,
        hideDescription,
        showFollow,
        showSubscribe,
        truncateDescription,
        hideSocial,
        userAlign,
    } = attributes;

    const blockStyleRef = useRef();

    useEffect(() => {
        if (blockStyleRef.current) {
            setElementRef(blockStyleRef.current);
        }
    }, [blockStyleRef]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [authorBulk, getAuthor] = useState(false);
    const [authorBlockWidth, getWidth] = useState(8);
    const [authorData, getTrim] = useState(false);//authorData
    const [authorTrim, getFilter] = useState(false);

    useEffect(() => {
        if (authorBulk && authorBulk.users) {
            let users = authorBulk.users.slice();
            if (showRole && showRole.length) {
                let sRole = [];
                for (let i = 0; i < showRole.length; i++) {
                    for (let o = 0; o < users.length; o++) {
                        if (users[o].role == showRole[i].value) {
                            sRole.push(users[o]);
                        }
                    }
                }
                users = sRole;
            }
            if (hideRole && hideRole.length) {
                let hRole = [];
                let hArray = [];
                for (let i = 0; i < hideRole.length; i++) {
                    hArray.push(hideRole[i].value);
                }
                for (let o = 0; o < users.length; o++) {
                    if (!hArray.includes(users[o].role)) {
                        hRole.push(users[o]);
                    }
                }
                users = hRole;
            }
            if (includeUser && includeUser.length) {
                let iUser = [];
                for (let i = 0; i < includeUser.length; i++) {
                    for (let o = 0; o < users.length; o++) {
                        if (users[o].ID == includeUser[i].value) {
                            iUser.push(users[o]);
                        }
                    }
                }
                users = iUser;
            }
            if (excludeUser && excludeUser.length) {
                let iUser = [];
                for (let i = 0; i < excludeUser.length; i++) {
                    for (let o = 0; o < users.length; o++) {
                        if ((users[o].ID != excludeUser[i].value) && (iUser.findIndex(x => x.ID == users[o].ID) === -1)) {
                            iUser.push(users[o]);
                        }
                    }
                }
                users = iUser;
            }
            getFilter(users);
        }
    }, [
        authorBulk,
        numberUser,
        showRole,
        hideRole,
        includeUser,
        excludeUser,
    ]);

    useEffect(() => {
        let num = parseInt(numberUser);
        if (authorTrim && authorTrim.length) {
            getTrim(authorTrim.slice(0, parseInt(num)));
        } else {
            getTrim(false);
        }
    }, [
        authorTrim,
    ]);

    useEffect(() => {
        let attr = {
        };
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-author'),
            method: 'POST',
            data: {
                attr: attr
            }
        }).then((data) => {
            getAuthor(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-user-list',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: blockStyleRef
    });

    function RenderBlockUser(props) {
        const desc = [];
        const social = [];
        const sub = [];
        if (listStyle != 'style-4' && listStyle != 'style-5') {
            if (!hideDescription && props.desc) {
                if (!truncateDescription) {
                    desc.push(<span className="gvnews_userlist-desc">{props.desc}</span>);
                } else {
                    desc.push(<span className="gvnews_userlist-desc">{props.desc.split(' ').splice(0, props.attr.length).join(' ') + '...'}</span>);
                }
            }
            if (!hideSocial && props.meta) {
                for (let i = 0; i < props.meta.length; i++) {
                    social.push(<div className="gvnews_userlist-socials"><a><i className={`fa ${props.meta[i].value}`}></i></a></div>);
                }
            }
        }
        return (
            <li>
                <div className="gvnews_userlist-wrap">
                    <div className="gvnews_userlist-photo">
                        <a><RawHTML>{props.avatar}</RawHTML></a>
                    </div>
                    <div className="gvnews_userlist-content">
                        <a className="gvnews_userlist-name">{props.name}</a>
                        {sub}
                        {desc}
                        {social}
                    </div>
                </div>
            </li>
        );
    }

    const [block, setBlock] = useState(false);
    useEffect(() => {
        const rows = [];
        if (authorData) {
            for (let i = 0; i < authorData.length; i++) {
                rows.push(<RenderBlockUser {...authorData[i]} />);
            }
            setBlock(
                <ul>
                    {rows}
                </ul>
            );
        }
    }, [
        authorBlockWidth,
        authorData,
        hideDescription,
        hideSocial,
        listStyle,
        showFollow,
        showSubscribe,
    ]);

    const headerData = {
        icon,
        title,
        second_title,
        headerType,
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="gvnews-raw-wrapper gvnews-editor">
                <div className={`gvnews_userlist ${listStyle} ${listStyle == 'style-4' ? 'gvnews_1_block' : ''} ${listStyle == 'style-1' ? blockWidth : listStyle == 'style-2' ? blockWidth2 : listStyle == 'style-3' ? blockWidth3 : listStyle == 'style-5' ? blockWidth : ''}`} style={listStyle == 'style-4' ? { 'text-align': 'left' } : userAlign == 'gvnews_user_align_center' ? { 'text-align': 'center' } : userAlign == 'gvnews_user_align_left' ? { 'text-align': 'left' } : userAlign == 'gvnews_user_align_right' ? { 'text-align': 'right' } : {}}>
                    <HeaderModule {...headerData} />
                    {block ? block : <ModuleSkeleton />}
                </div>
            </div>
        </div>
    </>;
});

export default UserlistBlock;