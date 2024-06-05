<?php

/**
 * @file
 * Install, update and uninstall functions for arts_admin_toolbar.
 */

/**
 * Update arts_admin_toolbar.settings to include avoid_custom_font.
 */
function arts_admin_toolbar_post_update_avoid_custom_font() {
  $config = \Drupal::configFactory()->getEditable('arts_admin_toolbar.settings');
  $config->set('avoid_custom_font', FALSE);
  $config->save(TRUE);
}
