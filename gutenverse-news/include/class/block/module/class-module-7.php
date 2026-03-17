<?php
/**
 * Module 7
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_7
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_7 extends Module_View_Abstract {

	/**
	 * This variable for consume block style
	 *
	 * @var string
	 */
	public $main_thumbnail_class = 'gvnews_pl_lg_6';

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		if ( 'ads' === $post ) {
			return $this->render_post_alternative(
				'<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_2' ) . '>{replace_content}</article>',
				'ads',
				$this->attribute
			);
		}
		$post_id      = $post->ID;
		$permalink    = esc_url( get_the_permalink( $post ) );
		$read_more    = $this->attribute['disable_readmore'] ? '' : ' <a href="' . $permalink . '" aria-label="' . esc_attr__( 'Read more about ', 'gutenverse-news' ) . esc_attr( get_the_title( $post ) ) . '" class="gvnews_readmore">' . esc_html__( 'Read more', 'gutenverse-news' ) . '<span class="screen-reader-text">' . esc_html__( ' about ', 'gutenverse-news' ) . esc_html( get_the_title( $post ) ) . '</span></a>';
		$overlay_icon = $this->get_overlay_icon( $post_id );

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_6', $post_id ) . ">
                    <{$this->post_title_tag} property=\"headline\" class=\"gvnews_post_title\">
                        <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                    </' . $this->post_title_tag . '>
                    <div class="gvnews_thumb' . $overlay_icon['with_overlay_icon'] . '">
						' . gvnews_edit_post( $post_id, 'right' ) . "
						<a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">{$this->get_thumbnail($post_id,$image_size)}</a>
						{$overlay_icon['overlay_icon']}
					</div>
					<div class=\"gvnews_postblock_content\">
						{$this->post_meta_1($post)}
						<div class=\"gvnews_post_excerpt\">
							<p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
							{$read_more}
						</div>
					</div>
                </article>";
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

		return "<div class=\"gvnews_posts gvnews_block_container\">
                    {$this->get_content_before($attr)}
                    {$content}
                    {$this->get_content_after($attr)}
                </div>
                {$navigation}";
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
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">{$this->build_column($result, false)}</div>";
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

	/**
	 * Method build_column
	 *
	 * @param array   $results results.
	 * @param boolean $is_ajax is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $is_ajax = false ) {
		$first_block = '';
		$results     = apply_filters( 'gvnews_module_query_results', $results, $this->attribute );
		$size        = count( $results );

		add_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-360x180' );
		}
		remove_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );

		return $first_block;
	}
}
