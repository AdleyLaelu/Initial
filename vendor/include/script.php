<script type="text/javascript" src="<?php echo base_url('vendor/js/jquery.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/js/popper.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/js/bootstrap.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/fonts/js/all.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/js/jquery.dataTables.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/js/dataTables.bootstrap4.min.js') ?>"></script>
<script type="text/javascript" src="<?php echo base_url('vendor/jquery-ui-1.12.1/jquery-ui.min.js') ?>"></script>

<script type="text/javascript">
  $(document).ready(function() {
      $('#example').DataTable();
      $( "#dateN" ).datepicker();
      $( "#accordion" ).accordion({
      	active: false
      });
    } );
</script>