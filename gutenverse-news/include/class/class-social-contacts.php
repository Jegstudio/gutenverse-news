<?php
/**
 * Social Contacts
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Social Contacts
 *
 * @author  Jegstudio
 */
class Social_Contacts {

	/**
	 * Add additional admin contact
	 *
	 * @return array
	 */
	public static function gvnews_admin_contact() {
		return array(
			'facebook'   => 'Facebook',
			'tiktok'     => 'Tiktok',
			'twitter'    => 'Twitter',
			'linkedin'   => 'Linkedin',
			'pinterest'  => 'Pinterest',
			'behance'    => 'Behance',
			'github'     => 'Github',
			'flickr'     => 'Flickr',
			'tumblr'     => 'Tumblr',
			'dribbble'   => 'Dribbble',
			'soundcloud' => 'Soundcloud',
			'instagram'  => 'Instagram',
			'vimeo'      => 'Vimeo',
			'youtube'    => 'Youtube',
			'reddit'     => 'Reddit',
			'vk'         => 'Vk',
			'weibo'      => 'Weibo',
			'twitch'     => 'Twitch',
			'rss'        => 'Rss',
			'threads'    => 'Threads',
			'xing'       => 'Xing',
		);
	}

	/**
	 * Social media array.
	 *
	 * @return array
	 */
	public static function social_icon_list_class() {
		return array(
			'url'        => 'fa fa-globe',
			'facebook'   => 'fab fa-facebook',
			'twitter'    => 'fab fa-twitter',
			'linkedin'   => 'fab fa-linkedin',
			'pinterest'  => 'fab fa-pinterest',
			'behance'    => 'fab fa-behance',
			'github'     => 'fab fa-github',
			'flickr'     => 'fab fa-flickr',
			'tumblr'     => 'fab fa-tumblr',
			'dribbble'   => 'fab fa-dribbble',
			'soundcloud' => 'fab fa-soundcloud',
			'instagram'  => 'fab fa-instagram',
			'vimeo'      => 'fab fa-vimeo',
			'youtube'    => 'fab fa-youtube',
			'vk'         => 'fab fa-vk',
			'reddit'     => 'fab fa-reddit',
			'weibo'      => 'fab fa-weibo',
			'rss'        => 'fa fa-rss',
			'twitch'     => 'fab fa-twitch',
			'tiktok'     => 'fa-brands fa-tiktok',
			'threads'    => 'fa-brands fa-threads',
			'xing'       => 'fab fa-xing',
		);
	}
}
