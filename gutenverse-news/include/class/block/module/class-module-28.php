<?php
/**
 * Module 28
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_28
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_28 extends Module_View_Abstract {


	/**
	 * Method set_content_setting_option
	 *
	 * @return void
	 */
	public function set_content_setting_option() {
		$this->options['show_date']          = '';
		$this->options['date_format']        = 'default';
		$this->options['date_format_custom'] = 'Y/m/d';
		$this->options['excerpt_length']     = 20;
	}

	/**
	 * Method render_block
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_block( $post ) {
		$attr = $this->attribute;
		$date = isset( $attr['show_date'] ) && $attr['show_date'] ? $this->post_meta_2( $post ) : '';

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_xs_4', $post->ID ) . '>
                    <div class="gvnews_postblock_content">
						<i class="fas fa-caret-right"></i>
                        <h3 class="gvnews_post_title">
                            <a href="' . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a>
                        </h3>
                        {$date}
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
			$first_block .= $this->render_block( $results[ $i ] );
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
		$attr        = $this->attribute;
		$show_border = isset( $attr['show_border'] ) && $attr['show_border'] ? 'show_border' : '';
		return "<div class=\"gvnews_posts {$show_border}\">
                    <div class=\"gvnews_postsmall gvnews_load_more_flag\">
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
