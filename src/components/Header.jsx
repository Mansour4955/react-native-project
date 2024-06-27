import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { motion } from 'framer-motion';

const Header = () => {
  const navigation = useNavigation();
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const closeLinks = () => {
    setShowLinks(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo} onPress={() => navigation.navigate('Home')}>
          Website
        </Text>

        <View style={styles.menu}>
          <TouchableOpacity onPress={toggleLinks}>
            {showLinks ? (
              <Feather name="x" size={24} color="#333" />
            ) : (
              <Feather name="menu" size={24} color="#333" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {showLinks && (
        <motion.View
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={styles.linksContainer}
        >
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Home');
              closeLinks();
            }}
          >
            <Text style={styles.linkText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Services');
              closeLinks();
            }}
          >
            <Text style={styles.linkText}>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('About');
              closeLinks();
            }}
          >
            <Text style={styles.linkText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Login');
              closeLinks();
            }}
          >
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() => {
              navigation.navigate('Register');
              closeLinks();
            }}
          >
            <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
        </motion.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menu: {
    marginRight: 10,
  },
  linksContainer: {
    flexDirection: 'column',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  link: {
    paddingVertical: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
