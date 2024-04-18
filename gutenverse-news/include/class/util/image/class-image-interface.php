<?php
/**
 * Image inteface
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util\Image;

/**
 * Image_Interface
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
interface Image_Interface {


	/**
	 * Method single_image_unwrap
	 *
	 * @param $id   $id id.
	 * @param $size $size size.
	 *
	 * @return string
	 */
	public function single_image_unwrap( $id, $size );

	/**
	 * Method image_thumbnail_unwrap
	 *
	 * @param $id   $id id.
	 * @param $size $size size.
	 *
	 * @return string
	 */
	public function image_thumbnail_unwrap( $id, $size );

	/**
	 * Method image_thumbnail
	 *
	 * @param $id   $id id.
	 * @param $size $size size.
	 *
	 * @return string
	 */
	public function image_thumbnail( $id, $size );

	/**
	 * Method owl_single_image
	 *
	 * @param $id   $id id.
	 * @param $size $size size.
	 *
	 * @return string
	 */
	public function owl_single_image( $id, $size );

	/**
	 * Method owl_lazy_single_image
	 *
	 * @param $id   $id id.
	 * @param $size $size size.
	 *
	 * @return void
	 */
	public function owl_lazy_single_image( $id, $size );

	/**
	 * Method owl_lazy_image
	 *
	 * @param $id $id id
	 * @param $size $size size
	 *
	 * @return string
	 */


	/**
	 * Method single_image
	 *
	 * @param $img_src   $img_src image source.
	 * @param $img_title $img_title image title.
	 * @param $img_size  $img_size image size.
	 *
	 * @return string
	 */
	public function single_image( $img_src, $img_title, $img_size );
}
