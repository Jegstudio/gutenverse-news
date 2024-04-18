import { compose } from '@wordpress/compose';
import { useEffect, useState, Fragment }  from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { ModuleOverlay } from '../../part/placeholder';
import { select, subscribe, useSelect } from '@wordpress/data';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';

const PostMeta = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
    } = props;


    const {
        metaLeft = [],
        metaRight = [],
        elementId,
    } = attributes;

    const { imgDir } = window['GVNewsConfig'];
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [categoryMeta, setCategoryMeta] = useState(false);
    const [contentData, setContentData] = useState(false);
    const currentId = wp.data.select('core/editor').getCurrentPostId();

    const [categoriesIds, setCategoriesIds] = useState([]);
    const [editorDate, setEditorDate] = useState(false);
    const authorId = select('core/editor').getEditedPostAttribute('author');

    const AuthorMeta = () => {
        if (contentData.authors && contentData.authors.length) {
            const image = true;
            const byClass = null;

            let author_image = [];
            let metaText = [];

            contentData.authors.forEach((author, index) => {
                let output = [];
                let author_text = [];
                let guest_author = (author.type === 'guest-author') ? true : false;

                if (image && index < 3) {
                    author_image.push(<img
                        key={index}
                        alt="admin"
                        src={author.name}
                        srcSet={author.avatar}
                        className={`avatar avatar-80 photo`}
                        height="80"
                        width="80"
                        loading="lazy"
                        decoding="async"
                    />);
                    author_text.push(author_image);
                    author_image = [];
                }

                if (index === 0) {
                    author_text.push(<span key={`meta_text-${index}`} className={`meta_text ${byClass}`}>{__('by', 'gutenverse-news')}</span>);
                }
                author_text.push(guest_author ? <a key={`name-${index}`} href="#" title={`${__('Posts by', 'gutenverse-news')} ${author.name}`} className="author url fn" rel="author">{author.name}</a> : <a key={`name-${index}`} href="#">{author.name}</a>);
                output.push(author_text);
                metaText.push(output);
            });

            return <Fragment>{metaText}</Fragment>
        }
        return <Fragment>
            <img alt="admin" src={`${imgDir}/author.png`}/>
            <span className="meta_text">by</span>
            <a href="#">admin</a>
        </Fragment>;
    };

    useEffect(() => {
        const selectedCategoriesAttr = select('core/editor').getEditedPostAttribute('categories');
        const selectedCategories = selectedCategoriesAttr ? selectedCategoriesAttr : []
        setCategoriesIds(selectedCategories);
        const editorDate = select('core/editor').getEditedPostAttribute('date');
        setEditorDate(editorDate);

        const unsubscribe = subscribe(() => {
            const updatedCategoriesAttr = select('core/editor').getEditedPostAttribute('categories');
            const updatedCategories = updatedCategoriesAttr ? updatedCategoriesAttr : []

            setCategoriesIds(updatedCategories);
            const udpatedEditorDate = select('core/editor').getEditedPostAttribute('date');
            setEditorDate(udpatedEditorDate);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            'gvnews-block',
            'gvnews-block-wrapper',
            'gvnews-post-meta',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    useEffect(() => {
        apiFetch({
            path: addQueryArgs('/gvnews-client/v1/get-post-meta-element'),
            method: 'POST',
            data: {
                attr: {
                    author: [authorId],
                    id: currentId,
                    post_date: editorDate,
                }
            },
        }).then((data) => {
            setContentData(JSON.parse(data));
        }).catch((e) => {
            console.error(e.message);
        }).finally(() => {
        });
    }, [
        authorId,
        currentId,
        editorDate
    ]);

    const categories = useSelect((select) => {
        const { getEntityRecords } = select('core');
        const categoryRecords = getEntityRecords('taxonomy', 'category', { per_page: -1 }) || [];

        return categoryRecords
        .filter((category) => categoriesIds.includes(category.id))
        .map((category, index) => {
            return category.name;
        });
    }, [categoriesIds]);

    useEffect(() => {
        const catLength = categories.length;
        if (catLength) {
            setCategoryMeta(categories.map((category, index) => {
                const comma = index + 1 !== catLength ? ', ' : '';
                return <span key={index} className="category-separator"><a href="#" rel="category tag">{category}</a>{comma}</span>;
            }));
        } else {
            setCategoryMeta(<Fragment>
                <a href="#" rel="category tag">Dummy</a>, 
                <a href="#" rel="category tag">Another</a>, 
                <a href="#" rel="category tag">Category</a>    
            </Fragment>)
        }
    }, [categories]);

    const MetaAuthor = () => {
        return <div className={`gvnews_meta_author`}>
            <AuthorMeta />
        </div>;
    };

    const convertDateFormat = inputDate => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const inputDateObj = new Date(inputDate);
        
        if (isNaN(inputDateObj.getTime())) {
          // Invalid input date, return an error message or handle it as needed.
          return "Invalid date format";
        }
        
        const formattedDate = inputDateObj.toLocaleDateString('en-US', options);
        return formattedDate.toUpperCase(); // Convert to uppercase for the "OCTOBER" part
      }

    function getCurrentDateTimeFormatted() {
        const now = new Date();
      
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        return formattedDate;
      }
      

    const MetaDate = () => {
        const date = editorDate ? convertDateFormat(editorDate) : convertDateFormat(getCurrentDateTimeFormatted())

        return <div className="gvnews_meta_date">
            <a href="#">{date}</a>
        </div>;
    };

    const MetaCategory = () => {
        return <div className="gvnews_meta_category">
            <span>
                <span className="meta_text">{__('in', 'gutenverse-news')}</span>
                {categoryMeta}
            </span>
        </div>;
    };

    const MetaComment = () => {
        return <div className="gvnews_meta_comment">
            <a href="/#respond"><i className="far fa-comment"></i>{contentData.commentNumber}</a>
        </div>;
    };


    const RenderMeta = (props) => {
        return props.metas.map((meta, index) => {
            let output;
            switch (meta.value) {
                case 'author':
                    output = <MetaAuthor key={index} />;
                    break;
                case 'date':
                    output = <MetaDate key={index} />;
                    break;
                case 'category':
                    output = <MetaCategory key={index} />;
                    break;
                case 'comment':
                    output = <MetaComment key={index} />;
                    break;
            }
            return output;
        });
    };

    const MetaLeftElement = () => {
        return <div className="meta_left">
            <RenderMeta metas={metaLeft ? metaLeft: []} />
        </div>;
    };

    const MetaRightElement = () => {
        return <div className="meta_left">
            <RenderMeta metas={metaRight ? metaRight: []} />
        </div>;
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {contentData ? <div className="gvnews_post_meta gvnews_custom_meta_wrapper">
                {MetaLeftElement()}
                {MetaRightElement()}
            </div> : <ModuleOverlay />}
        </div>
    </>;
});

export default PostMeta;