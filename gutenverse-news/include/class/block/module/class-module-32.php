<?php
/**
 * Module 32
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_32
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_32 extends Module_View_Abstract {

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$post_id         = $post->ID;
		$thumbnail       = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->image_thumbnail( $post_id, $image_size );
		$box_shadow_flag = isset( $this->attribute['box_shadow'] ) && $this->attribute['box_shadow'] ? 'box_shadow' : '';
		$permalink       = esc_url( get_the_permalink( $post ) );
		return '<article ' . gvnews_post_class( 'gvnews_post ' . $box_shadow_flag, $post_id ) . '>
					<div class="box_wrap">
						<header class="gvnews_postblock_heading">
							' . gvnews_edit_post( $post_id ) . "
							<div class=\"gvnews_post_category\">
								<span>{$this->get_primary_category($post_id)}</span>
							</div>
							<h3 class=\"gvnews_post_title\">
								<a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
							</h3>
						</header>
						<div class=\"gvnews_thumb\">
							<a href=\"{$permalink}\">{$thumbnail}</a>
						</div>
						<div class=\"gvnews_postblock_content\">
							<div class=\"gvnews_post_excerpt\">
								<p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
								<a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . "</a>
							</div>
						</div>
						{$this->post_meta_1($post)}
					</div>
				</article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-featured-750' );
		}

		return $first_block;
	}

	/**
	 * Method render_output
	 *
	 * @param array  $attr attribute.
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
	 * @param array  $result result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $column_class ) {
		return "<div class=\"gvnews_posts_wrap gvnews_posts_masonry\">
					<div class=\"gvnews_posts gvnews_load_more_flag\"> 
						{$this->build_column($result)}
					</div>
				</div>";
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
		return $this->build_column( $result );
	}
}
