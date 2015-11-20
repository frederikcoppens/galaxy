"""
This module manages loading/etc of Galaxy interactive tours.
"""

import os
import yaml
import logging
log = logging.getLogger( __name__ )


def tour_loader(contents_dict):
    #  This *COULD* be done on the clientside.  Maybe even should?
    for step in contents_dict['steps']:
        if 'intro' in step:
            step['content'] = step.pop('intro')
        if 'position' in step:
            step['placement'] = step.pop('position')
        # Handle these hooks on the client side, instead of trying to ship
        # functions as strings and eval
        # if 'preclick' in step:
        #     step['onShow'] = "$('%s').click()" % step.pop('preclick')
        # if 'postclick' in step:
        #     step['onHide'] = "$('%s').click()" % step.pop('postclick')
        # if 'textinsert' in step:
        #     step['onShown'] = "$('%s').text('%s')" % (step['element'], step.pop('textinsert'))
        if 'element' not in step:
            step['orphan'] = True
    return contents_dict


class ToursRegistry(object):

    def __init__(self, tour_dir):
        self.tour_dir = tour_dir
        self.load_tours()

    def tours_by_id_with_description(self):
        return [{'id': k,
                 'description': self.tours[k].get('description', None)}
                for k in self.tours.keys()]

    def load_tours(self):
        self.tours = {}
        for f in os.listdir(self.tour_dir):
            if f.endswith('.yaml'):
                tour_path = os.path.join(self.tour_dir, f)
                with open(tour_path) as handle:
                    conf = yaml.load(handle)
                # Could pop the following, but is there a good reason to?
                # As long as they key doesn't conflict with tour keys, it's
                # fine.
                tour_id = conf.get('tour_id', f.strip('.yaml'))
                self.tours[tour_id] = tour_loader(conf)
                log.info("Loaded tour '%s'" % tour_id)

    def tour_contents(self, tour_id):
        # Extra format translation could happen here (like the previous intro_to_tour)
        # For now just return the loaded contents.
        return self.tours.get(tour_id, None)
