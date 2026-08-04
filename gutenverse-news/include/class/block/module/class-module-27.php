<?php
/**
 * Module 27
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

use GUTENVERSE\NEWS\Util\Svg_Icons;

/**
 * Module_27
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_27 extends Module_View_Abstract {
	/**
	 * This variable for consume block style
	 *
	 * @var string
	 */
	public $main_thumbnail_class = 'gvnews_pl_md_4';
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
		$read_more = $this->attribute['disable_readmore'] ? '' : ' <a href="' . $permalink . '" aria-label="' . esc_attr__( 'Read more about ', 'gutenverse-news' ) . esc_attr( get_the_title( $post ) ) . '" class="gvnews_readmore">' . esc_html__( 'Read more', 'gutenverse-news' ) . '<span class="screen-reader-text">' . esc_html__( ' about ', 'gutenverse-news' ) . esc_html( get_the_title( $post ) ) . '</span></a>';

		$show_excerpt = 1 === $type ? isset( $this->attribute['always_show_excerpt'] ) ? $this->attribute['always_show_excerpt'] : false : true;

		$excerpt = ! $show_excerpt ? null :
			'<div class="gvnews_post_excerpt">
                            <p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>'
			. $read_more . ' 
                        </div>';

		$post_meta = $this->post_meta_3( $post );
		$overlay_icon = $this->get_overlay_icon( $post_id );

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_4', $post_id ) . '>
                    <div class="gvnews_thumb' . $overlay_icon['with_overlay_icon'] . '">
                        ' . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">{$thumbnail}</a>
						{$overlay_icon['overlay_icon']}
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <div class=\"gvnews_post_category\">
							<span>{$this->get_primary_category($post_id)}</span>
                        </div>
                        <{$this->post_title_tag} class=\"gvnews_post_title\"><a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\" >" . esc_attr( get_the_title( $post ) ) . "</a></{$this->post_title_tag}>
                        {$post_meta}
                        {$excerpt}
                    </div>
                </article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array   $results results.
	 * @param boolean $column_class is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= 'gvnews_col_1o3' === $column_class ? $this->render_block_type( $results[ $i ], 'gvnews-350x250', 1 ) : $this->render_block_type( $results[ $i ], 'gvnews-350x250', 2 );
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
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">{$this->build_column( $result, $column_class )}</div>";
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
		return $this->build_column( $result, $column_class );
	}

	/**
	 * Method render_module
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$heading = $this->render_header( $attr );
		$content = $this->render_output( $attr, $column_class );
		$script  = $this->render_script( $attr, $column_class );

		$html_classes = gvnews_build_html_classes(
			array(
				'gvnews_postblock_27',
				'gvnews_postblock_blog_2',
				'gvnews_postblock',
				'gvnews_module_hook',
				'gvnews_pagination_' . esc_attr( $attr['pagination_mode'] ),
				esc_attr( $column_class ),
				esc_attr( $this->unique_id ),
				esc_attr( $this->get_vc_class_name() ),
				$attr['allow_override_category_color'] ? 'gvnews_override_category' : '',
			)
		);

		$data_attr = gvnews_build_data_attr(
			array(
				'unique' => $this->unique_id,
			)
		);

		return '<div ' . esc_attr( $this->element_id( $attr ) ) . " class=\"{$html_classes}\" {$data_attr}>
                    {$heading}
                    {$content}
                    {$script}
                </div>";
	}
}
