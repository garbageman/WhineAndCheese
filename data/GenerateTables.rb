# This is a ruby script that will create a pairing CSV with random numbers
wines = ["Riesling","Gewürztraminer","Chardonnay","Sauvignon Blanc","Syrah","Merlot","Cabernet Sauvignon", "Pinot Noir"]
cheeses = ["Cheddar","Gouda","American","Mozzarella","Brie","Swiss","Provolone","Muenster","Gorgonzola"]
review_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

# First create a file for the user table
File.readLines('users.txt') { |line|
  # This is a user so create a password for the user and other information
  users = []
  
}



# Open the file and write each combination of wines and cheeses and their ratings
File.open("TestPairings.csv", 'w') { |file|
  wines.each{|wine|
    cheeses.each {|cheese|
      # puts wine + " " + cheese
      # Generate a random number of reviews 100 to 1000
      num_reviews = rand(900) + 100
      # The total rating can range between everyone giving all 1s and everyone giving all 5s
      total_rating = rand(num_reviews * 4) + num_reviews
      # Average rating is the total_rating / num_reviews
      average_rating = total_rating.to_f / num_reviews.to_f
      puts wine + ", " + cheese + ", " + average_rating.round(2).to_s + " " + num_reviews.to_s + " " + total_rating.to_s
    }
  }
}
