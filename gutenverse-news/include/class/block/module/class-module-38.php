<?php
/**
 * Module 38
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_38
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_38 extends Module_View_Abstract {

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post ) {
		$post_id    = $post->ID;
		$thumb_id   = get_post_thumbnail_id( $post_id );
		$thumb_data = wp_get_attachment_image_src( $thumb_id, 'full' );
		$style      = "style='background-image: url({$thumb_data[0]})'";
		$permalink  = esc_url( get_the_permalink( $post ) );

		return '<article ' . gvnews_post_class( 'gvnews_post', $post_id ) . '>
					' . gvnews_edit_post( $post_id, 'right' ) . "
					<div class=\"gvnews_thumb\" {$style}></div>
					<div class=\"box_wrap\">
						<div class=\"gvnews_post_category\">
							<span>{$this->get_primary_category($post_id)}</span>
						</div>
						<div class=\"gvnews_postblock_content\">
							<h3 class=\"gvnews_post_title\">
								<a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . '</a>
							</h3>
							<div class="gvnews_post_excerpt">
								<p>' . esc_attr( $this->get_excerpt( $post ) ) . "</p>
							</div>
							{$this->post_meta_3($post)}
						</div>
						<div class=\"gvnews_readmore_arrow\">
							<a href=\"{$permalink}\"><i class=\"fas fa-arrow-right-long\"></i></a>
						</div>
					</div>
				</article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array $results results.
	 * @param bool  $is_ajax is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $is_ajax ) {
		$first_block = '';
		$size        = count( $results );

		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ] );
		}

		return $first_block;
	}

	/**
	 * Method render_output
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class..
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
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">
					{$this->build_column($result, false)}
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
		return $this->build_column( $result, true );
	}
}
