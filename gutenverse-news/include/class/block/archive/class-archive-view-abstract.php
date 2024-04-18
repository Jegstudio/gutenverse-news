<?php
/**
 * Archive View Abstract
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Archive;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;
use GUTENVERSE\NEWS\Block\Block_Query;

/**
 * Archive_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Archive_View_Abstract extends Block_View_Abstract {

	/**
	 * Post per page
	 *
	 * @var mixed
	 */
	public $post_per_page;

	/**
	 * Term
	 *
	 * @var mixed
	 */
	protected static $term;

	/**
	 * Index
	 *
	 * @var mixed
	 */
	protected static $index;

	/**
	 * Result
	 *
	 * @var mixed
	 */
	protected static $result = array();

	/**
	 * Method is_on_editor
	 *
	 * @return bool
	 */
	public function is_on_editor() {

		if ( function_exists( 'gvnews_is_frontend_vc' ) && gvnews_is_frontend_vc() ) {
			return true;
		}

		if ( isset( $_REQUEST['action'] ) ) {

			if ( ( 'elementor' === $_REQUEST['action'] || 'elementor_ajax' === $_REQUEST['action'] ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Method render_module
	 *
	 * @param array      $attr         attribute.
	 * @param string     $column_class column class.
	 * @param array|null $result       result.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class, $result = null ) {
		return $this->render_module_front( $attr, $column_class );
	}

	/**
	 * Method get_term
	 *
	 * @return array
	 */
	public function get_term() {
		return ! self::$term ? get_queried_object() : self::$term;
	}

	/**
	 * Method get_number_post
	 *
	 * @return integer
	 */
	public function get_number_post() {

		if ( ! $this->post_per_page ) {

			$this->post_per_page = get_option( 'posts_per_page' );
		}

		return $this->post_per_page;
	}

	/**
	 * Method do_query
	 *
	 * @param array $attr attribute.
	 *
	 * @return array
	 */
	protected function do_query( $attr ) {
		if ( ! self::$result ) {

			if ( is_category() ) {
				$term = $this->get_term();

				if ( isset( $term->term_id ) ) {
					$attr['include_category'] = $term->term_id;
					$this->post_per_page      = $this->get_number_post();
				}
			} elseif ( is_tag() ) {
				$term = $this->get_term();

				if ( isset( $term->term_id ) ) {
					$attr['include_tag'] = $term->term_id;
					$this->post_per_page = $this->get_number_post();
				}
			} elseif ( is_author() ) {
				$user = get_userdata( get_query_var( 'author' ) );

				if ( isset( $user->ID ) ) {
					$attr['include_author'] = $user->ID;
					$this->post_per_page    = $this->get_number_post();
				}
			} elseif ( is_date() ) {
				$attr['date_query']  = array(
					array(
						'year'  => get_query_var( 'year' ) ? get_query_var( 'year' ) : null,
						'month' => get_query_var( 'monthnum' ) ? get_query_var( 'monthnum' ) : null,
						'day'   => get_query_var( 'day' ) ? get_query_var( 'day' ) : null,
					),
				);
				$this->post_per_page = $this->get_number_post();
			}

			$attr['sort_by']                = 'latest';
			$attr['post_type']              = 'post';
			$attr['post_offset']            = 0;
			$attr['number_post']            = $this->post_per_page;
			$attr['pagination_number_post'] = $this->post_per_page;
			$attr['paged']                  = gvnews_get_post_current_page();

			$result = Block_Query::do_query( $attr );

			if ( isset( $result['result'] ) ) {
				self::$result = $result;
			}
		}

		return self::$result;
	}

	/**
	 * Method get_result
	 *
	 * @param $attr        $attr attribute.
	 * @param $number_post $number_post number post.
	 *
	 * @return array
	 */
	protected function get_result( $attr, $number_post ) {
		$result = $this->do_query( $attr );

		if ( ! empty( $result['result'] ) && is_array( $result['result'] ) ) {

			if ( isset( $number_post['size'] ) ) {
				$number_post = $number_post['size'];
			}

			$result['result'] = $number_post ? array_slice( $result['result'], self::$index, $number_post ) : array_slice( $result['result'], self::$index );

			if ( ! is_admin() ) {
				self::$index += $number_post;
			}
		}

		return $result;
	}
	/**
	 * Method render_module_front
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	abstract public function render_module_front( $attr, $column_class );
}
