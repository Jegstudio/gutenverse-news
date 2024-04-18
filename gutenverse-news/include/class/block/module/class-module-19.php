<?php
/**
 * Module 19
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_19
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_19 extends Module_View_Abstract {


	/**
	 * Method render_block
	 *
	 * @param object  $post       post.
	 * @param string  $image_size image size.
	 * @param integer $type       type.
	 *
	 * @return string
	 */
	public function render_block( $post, $image_size, $type = 1 ) {
		$permalink        = esc_url( get_the_permalink( $post ) );
		$additional_class = ( ! has_post_thumbnail( $post->ID ) ) ? ' no_thumbnail' : '';

		$content = '<div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post->ID ) . '
                        <a href="' . $permalink . '">' . $this->get_thumbnail( $post->ID, $image_size ) . '</a>
                    </div>
                    <div class="gvnews_postblock_content">
                        <h3 class="gvnews_post_title">
                            <a href="' . $permalink . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                        </h3>
                        ' . $this->post_meta_2( $post ) . '
                    </div>';

		return 1 === $type ?
		'<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_box' . $additional_class, $post->ID ) . '>
                    <div class="box_wrap">
                    ' . $content . ' 
                    </div>
                </article>' :
		'<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_sm' . $additional_class, $post->ID ) . '>
                ' . $content . '
                </article>';
	}

	/**
	 * Method build_column_1
	 *
	 * @param array $results result.
	 *
	 * @return string
	 */
	public function build_column_1( $results ) {
		$first_block  = $this->render_block( $results[0], 'gvnews-350x250', 1 );
		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block( $results[ $i ], 'gvnews-120x86', 2 );
		}

		return "<div class=\"gvnews_posts\">
                    {$first_block}
                    <div class=\"gvnews_postsmall gvnews_load_more_flag\">
                        {$second_block}
                    </div>
                </div>";
	}

	/**
	 * Method build_column_2
	 *
	 * @param array  $results result.
	 * @param string $col column.
	 *
	 * @return string
	 */
	public function build_column_2( $results, $col = 'gvnews_col_2o3' ) {
		$first_block = '';
		$limit       = 'gvnews_col_2o3' === $col ? 2 : 3;
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			if ( $i < $limit ) {
				$first_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 1 );
			} else {
				$first_block .= $this->render_block( $results[ $i ], 'gvnews-120x86', 2 );
			}
		}

		return "<div class=\"gvnews_posts gvnews_load_more_flag\">
                    {$first_block}
                </div>";
	}

	/**
	 * Method build_column_1_alt
	 *
	 * @param array $results result.
	 *
	 * @return string
	 */
	public function build_column_1_alt( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block( $results[ $i ], 'gvnews-120x86', 2 );
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
		return 'gvnews_col_1o3' === $column_class ? $this->build_column_1( $result ) : $this->build_column_2( $result, $column_class );
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
}
