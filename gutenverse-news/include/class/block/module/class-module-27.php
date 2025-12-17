<?php
/**
 * Module 27
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

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
		$icon_clock = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>';
		$icon_clock = $this->render_icon( 'svg', 'fas fa-clock', base64_encode( $icon_clock ) );

		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );
		$thumbnail = $this->get_thumbnail( $post_id, $image_size );
		$category  = gvnews_get_primary_category( $post_id );
		$category  = '<a href="' . get_category_link( $category ) . '">' . get_cat_name( $category ) . '</a>';
		$read_more = $this->attribute['disable_readmore'] ? '' : "<a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>';
		$excerpt   = 1 === $type ? null :
			'<div class="gvnews_post_excerpt">
                            <p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>'
			. $read_more . ' 
                        </div>';

		$post_meta = "<div class=\"gvnews_post_meta\">
                            <div class=\"gvnews_meta_date\">{$icon_clock} {$this->format_date( $post )}</div>
                        </div>";

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_4', $post_id ) . '>
                    <div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\">{$thumbnail}</a>
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <div class=\"gvnews_post_category\">
                            <span>{$category}</span>
                        </div>
                        <h3 class=\"gvnews_post_title\"><a href=\"{$permalink}\" >" . esc_attr( get_the_title( $post ) ) . "</a></h3>
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
