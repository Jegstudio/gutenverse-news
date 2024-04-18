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

		// author detail.
		$author      = $post->post_author;
		$author_text = '<div class="gvnews_meta_author"><span class="label">' . esc_html__( 'by', 'gutenverse-news' ) . '</span> <a href="' . get_author_posts_url( $author ) . '">' . get_the_author_meta( 'display_name', $author ) . '</a></div>';

		$post_meta = "<div class=\"gvnews_post_meta\">
						<div class=\"gvnews_meta_date\"><i class=\"fas fa-clock\"></i> {$this->format_date($post)}</div>
					</div>";

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
                            <a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . "</a>
                        </div>
                    </div>
                    <div class=\"gvnews_meta_footer clearfix\">
                        {$author_text}
						<div></div>
                        <div class=\"gvnews_meta_comment\"><i class=\"far fa-comment\"></i> <a href=\"" . gvnews_get_respond_link( $post_id ) . '">' . gvnews_get_comments_number( $post_id ) . ' ' . esc_html__( 'Comments', 'gutenverse-news' ) . '</a></div>
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
		$content    = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();

		return "<div class=\"gvnews_block_container\">
                    {$this->get_content_before($attr)}
                    {$content}
                    {$this->get_content_after($attr)}
                </div>
                <div class=\"gvnews_block_navigation\">
                    {$this->get_navigation_before($attr)}
                    {$navigation}
                    {$this->get_navigation_after($attr)}
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
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">{$this->build_column($result,$column_class, false)}</div>";
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
