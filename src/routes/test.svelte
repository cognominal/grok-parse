<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
</script>

<div class="p-4">
  <h1 class="text-2xl mb-4">shadcn-svelte Test Page</h1>
  
  <div class="space-y-4">
    <Button variant="default">Default Button</Button>
    <Button variant="primary">Primary Button</Button>
    
    <Input type="text" placeholder="Test Input" />
  </div>
</div>
