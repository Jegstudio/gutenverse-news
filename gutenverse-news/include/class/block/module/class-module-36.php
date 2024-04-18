<?php
/**
 * Module 36
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_36
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_36 extends Module_View_Abstract {

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$primary_category = $this->get_primary_category( $post->ID );
		$box_shadow_flag  = isset( $this->attribute['box_shadow'] ) && $this->attribute['box_shadow'] ? 'box_shadow' : '';

		if ( $this->is_thumbnail_landscape( $post->ID ) ) {
			$thumbnail = $this->get_thumbnail( $post->ID, $image_size );

			return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_5 ' . $box_shadow_flag, $post->ID ) . '>
						<div class="box_wrap">
							<div class="gvnews_thumb">
								' . gvnews_edit_post( $post->ID ) . '
								<a href="' . esc_url( get_the_permalink( $post ) ) . '">' . $thumbnail . "</a>
								<div class=\"gvnews_post_category\">
									<span>{$primary_category}</span>
								</div>
							</div>
							<div class=\"gvnews_postblock_content\">
								<h3 class=\"gvnews_post_title\">
									<a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
								</h3>
								' . $this->post_meta_3( $post ) . '
								<div class="gvnews_post_excerpt">
									<p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>
								</div>
							</div>
						</div>
					</article>';
		}
		$thumb_id   = get_post_thumbnail_id( $post->ID );
		$thumb_data = wp_get_attachment_image_src( $thumb_id, 'full' );

		$style = "style='background-image: url({$thumb_data[0]})'";

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_box', $post->ID ) . ">
					<div class=\"box_wrap\">
						<span class=\"gvnews_postformat_icon\"></span>
						<div class=\"gvnews_thumb\" {$style}>
							" . gvnews_edit_post( $post->ID, 'right' ) . "
							<div class=\"gvnews_post_category\">
								<span>{$primary_category}</span>
							</div>
						</div>
						<div class=\"gvnews_postblock_content\">
							<h3 class=\"gvnews_post_title\">
								<a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
							</h3>
							<div class="gvnews_post_excerpt">
								<p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>
							</div>
							' . $this->post_meta_1( $post ) . '
						</div>
					</div>
				</article>';
	}

	/**
	 * Method build_column_1
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_1( $results ) {
		$first_block = '';
		$size = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-350x250' );
		}

		return "<div class=\"gvnews_posts_wrap\">
					<div class=\"gvnews_posts gvnews_load_more_flag\"> 
						{$first_block}
					</div>
				</div>";
	}

	/**
	 * Method build_column_1_alt
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_1_alt( $results ) {
		$first_block = '';
		$size = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-350x250' );
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
		return $this->build_column_1( $result );
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
		return $this->build_column_1_alt( $result );
	}

	/**
	 * Method is_thumbnail_landscape
	 *
	 * @param string $id id.
	 *
	 * @return boolean
	 */
	public function is_thumbnail_landscape( $id ) {
		$thumb_id   = get_post_thumbnail_id( $id );
		$thumb_data = wp_get_attachment_image_src( $thumb_id, 'full' );
		return ( ( isset( $thumb_data[1] ) && isset( $thumb_data[2] ) ) && ( $thumb_data[1] < $thumb_data[2] ) ) ? false : true;
	}
}
