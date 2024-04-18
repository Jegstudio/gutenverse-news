<?php
/**
 * Module 3
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_3
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_3 extends Module_View_Abstract {


	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param stirng $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$is_feed   = gvnews_get_rss_post_id( $post->ID );
		$thumbnail = $is_feed ? $post->get_thumbnail( $image_size ) : $this->get_thumbnail( $post->ID, $image_size );
		$title     = $is_feed ? $post->title : get_the_title( $post->ID );
		$permalink = $is_feed ? $post->permalink : get_the_permalink( $post->ID );
		$edit      = $is_feed ? '' : gvnews_edit_post( $post->ID );
		$excerpt   = $is_feed ? $post->description : $this->get_excerpt( $post );

		$output =
		'<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_2', $post->ID ) . '>
                <div class="gvnews_thumb">
                    ' . $edit . '
                    <a href="' . esc_url( $permalink ) . '">' . $thumbnail . '</a>
                </div>
                <div class="gvnews_postblock_content">
                    <h3 class="gvnews_post_title">
                        <a href="' . esc_url( $permalink ) . '">' . esc_attr( $title ) . '</a>
                    </h3>
                    ' . $this->post_meta_1( $post, false, $is_feed ) . '
                    <div class="gvnews_post_excerpt">
                        <p>' . $excerpt . '</p>
                    </div>
                </div>
            </article>';

		return $output;
	}

	/**
	 * Method build_column_1
	 *
	 * @param object $results results.
	 *
	 * @return string
	 */
	public function build_column_1( $results ) {
		$first_block = '';
		$size = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-120x86' );
		}

		$output =
		"<div class=\"gvnews_posts gvnews_load_more_flag\">
                {$first_block}
            </div>";

		return $output;
	}

	/**
	 * Method build_column_2
	 *
	 * @param arary $results results.
	 *
	 * @return string
	 */
	public function build_column_2( $results ) {
		$first_block = '';
		$count = count( $results );
		for ( $i = 0; $i < $count; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-350x250' );
		}

		$output =
		"<div class=\"gvnews_posts gvnews_load_more_flag\">
                {$first_block}
            </div>";

		return $output;
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
		$count = count( $results );
		for ( $i = 0; $i < $count; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-120x86' );
		}

		$output = $first_block;

		return $output;
	}

	/**
	 * Method build_column_2_alt
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_2_alt( $results ) {
		$first_block = '';
		$count = count( $results );
		for ( $i = 0; $i < $count; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-350x250' );
		}

		$output = $first_block;

		return $output;
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
		if ( isset( $attr['results'] ) ) {
			$results = $attr['results'];
		} else {
			$results = $this->build_query( $attr );
		}

		$navigation = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );

		if ( ! empty( $results['result'] ) ) {
			$content = $this->render_column( $results['result'], $column_class );
		} else {
			$content = $this->empty_content();
		}

		return "<div class=\"gvnews_posts gvnews_block_container\">
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
		switch ( $column_class ) {
			case 'gvnews_col_1o3':
				$content = $this->build_column_1( $result );
				break;
			case 'gvnews_col_3o3':
			case 'gvnews_col_2o3':
			default:
				$content = $this->build_column_2( $result );
				break;
		}

		return $content;
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
		switch ( $column_class ) {
			case 'gvnews_col_1o3':
				$content = $this->build_column_1_alt( $result );
				break;
			case 'gvnews_col_3o3':
			case 'gvnews_col_2o3':
			default:
				$content = $this->build_column_2_alt( $result );
				break;
		}

		return $content;
	}
}
