<?php
/**
 * Module 26
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_26
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_26 extends Module_View_Abstract {

	/**
	 * This variable for consume block style
	 *
	 * @var string
	 */
	public $main_thumbnail_class = 'gvnews_pl_lg_9';
	/**
	 * Method render_block_type
	 *
	 * @param object  $post       post.
	 * @param string  $image_size image size.
	 * @param integer $type       type.
	 *
	 * @return string
	 */
	public function render_block_type( $post, $image_size, $type = 1 ) {
		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );
		$thumbnail = $this->get_thumbnail( $post_id, $image_size );
		$category  = gvnews_get_primary_category( $post_id );
		$category  = '<a href="' . get_category_link( $category ) . '">' . get_cat_name( $category ) . '</a>';
		$read_more = $this->attribute['disable_readmore'] ? '' : "<a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>';

		// author detail.
		$author      = $post->post_author;
		$author_text = '<div class="gvnews_meta_author"><span class="label">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a href="' . get_author_posts_url( $author ) . '">' . get_the_author_meta( 'display_name', $author ) . '</a></div>';

		$icon_clock = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';
		$icon_clock = $this->render_icon( 'svg', 'fas fa-clock', base64_encode( $icon_clock ) );

		$post_meta = "<div class=\"gvnews_post_meta\">
						<div class=\"gvnews_meta_date\">{$icon_clock} {$this->format_date( $post )}</div>
					</div>";

		$icon_comment = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9c.1-.2 .2-.3 .3-.5z"></path></svg>';
		$icon_comment = $this->render_icon( 'svg', 'far fa-comment', base64_encode( $icon_comment ) );

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_9', $post_id ) . ">
                    <header class=\"gvnews_postblock_heading\">
                        <div class=\"gvnews_post_category\"><span>{$category}</span></div>
                        <h3 class=\"gvnews_post_title\"><a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a></h3>
                        {$post_meta}
                    </header>
                    <div class=\"gvnews_thumb\"> 
                        " . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\">{$thumbnail}</a> 
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <div class=\"gvnews_post_excerpt\">
                            <p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
                        </div>
                        <div class=\"gvnews_readmore_wrap\">
                        	{$read_more}
                        </div>
                    </div>
                    <div class=\"gvnews_meta_footer clearfix\">
                        {$author_text}
						<div></div>
                        <div class=\"gvnews_meta_comment\">{$icon_comment} <a href=\"" . gvnews_get_respond_link( $post_id ) . '">' . gvnews_get_comments_number( $post_id ) . ' ' . esc_html__( 'Comments', 'gutenverse-news' ) . '</a></div>
                    </div>
                </article>';
	}

	/**
	 * Method build_column
	 *
	 * @param array  $results results.
	 * @param string $column_class is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class ) {
		$first_block = '';
		$size        = count( $results );

		$image_size = 'gvnews-750x375';
		if ( 'gvnews_col_1o3' === $column_class ) {
			$image_size = 'gvnews-360x180';
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			$image_size = 'gvnews-1140x570';
		}

		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= 'gvnews_col_1o3' === $column_class ? $this->render_block_type( $results[ $i ], $image_size, 1 ) : $this->render_block_type( $results[ $i ], $image_size, 2 );
		}

		return $first_block;
	}

	/**
	 * Method render_output
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_output( $attr, $column_class ) {
		$results    = isset( $attr['results'] ) ? $attr['results'] : $this->build_query( $attr );
		$navigation = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );

		add_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
		$content = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();
		remove_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );

		return "<div class=\"gvnews_block_container\">
                    {$this->get_content_before( $attr )}
                    {$content}
                    {$this->get_content_after( $attr )}
                </div>
                <div class=\"gvnews_block_navigation\">
                    {$this->get_navigation_before( $attr )}
                    {$navigation}
                    {$this->get_navigation_after( $attr )}
                </div>";
	}

	/**
	 * Method render_column
	 *
	 * @param array  $result       result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $column_class ) {
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">{$this->build_column( $result, $column_class, false )}</div>";
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array  $result result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $column_class ) {
		return $this->build_column( $result, $column_class, true );
	}
}
