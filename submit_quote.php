<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = strip_tags(trim($_POST["name"]));
    $phone = strip_tags(trim($_POST["phone"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $project_type = strip_tags(trim($_POST["project_type"]));
    $message = strip_tags(trim($_POST["message"]));

    // 1. Send Email via Google Workspace Domain
    $to = "email@aucabinet.au";
    $subject = "New Quote Request: $project_type from $name";
    $email_body = "Name: $name\nPhone: $phone\nEmail: $email\nProject: $project_type\n\nDetails:\n$message";
    $headers = "From: noreply@aucabinet.au\r\nReply-To: $email";
    
    mail($to, $subject, $email_body, $headers);

    // 2. Send Notification to your Telegram Bot (@behr0z_bot)
    $botToken = "YOUR_TELEGRAM_BOT_TOKEN"; // Replace with your actual bot token
    $chatId = "YOUR_TELEGRAM_CHAT_ID";     // Replace with your Telegram chat/user ID
    
    $telegramMessage = "🚨 *New Lead from AU Cabinet!*\n\n"
                     . "👤 *Name:* $name\n"
                     . "📞 *Phone:* $phone\n"
                     . "✉️ *Email:* $email\n"
                     . "🏠 *Project:* $project_type\n"
                     . "💬 *Notes:* $message";

    $url = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($telegramMessage) . "&parse_mode=Markdown";
    
    // Trigger Telegram notification
    @file_get_contents($url);

    // Redirect user back with success message or JSON response
    header("Location: index.html?success=1");
    exit();
}
?>