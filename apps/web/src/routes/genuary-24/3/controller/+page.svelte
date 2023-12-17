<script lang="ts">
  import { Button } from '@partnerds-de/ui';

  import { requestData } from '$lib/client/webSocketUtils';
  import { debug, messages } from '$lib/store';

  let allowLogging = false;

  debug.subscribe((isDebugEnabled) => {
    allowLogging = isDebugEnabled;
  });

  async function submitWSMessage() {
    const response = await requestData(null);
    if (allowLogging) {
      messages.set([...$messages, response]);
    }
  }
</script>

<Button className="absolute top-0 left-0" onClick={submitWSMessage}>set message</Button>
